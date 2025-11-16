"use client"

import { useCallback, useEffect, useState } from "react"

import {
  fetchBudgets,
  fetchInsights,
  fetchRiskFlags,
  fetchTransactions,
  fetchUser,
} from "@/lib/api"
import { Budget, FinexData, Insight, RiskFlag, Transaction, UserProfile } from "@/lib/types"

interface State extends FinexData {
  loading: boolean
  error: string | null
}

const initialState: State = {
  user: null,
  transactions: [],
  budgets: [],
  insights: [],
  riskFlags: [],
  loading: true,
  error: null,
}

export function useFinexData(userId: string | undefined) {
  const [state, setState] = useState<State>(initialState)

  const load = useCallback(async () => {
    if (!userId) {
      setState((prev) => ({ ...prev, loading: false, error: "Missing user id" }))
      return
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const [user, transactions, budgets, insights, riskFlags] = await Promise.all([
        fetchUser(userId),
        fetchTransactions(userId),
        fetchBudgets(userId),
        fetchInsights(userId),
        fetchRiskFlags(userId),
      ])

      setState({
        user,
        transactions,
        budgets,
        insights,
        riskFlags,
        loading: false,
        error: null,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load data",
      }))
    }
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  return { ...state, refresh: load }
}
