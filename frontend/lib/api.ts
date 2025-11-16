import { Budget, Insight, RiskFlag, Transaction, UserProfile } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_FINEX_API_URL

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_FINEX_API_URL is not configured")
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || res.statusText)
  }

  return res.json() as Promise<T>
}

export function fetchUser(userId: string) {
  return request<UserProfile>(`/users/${userId}`)
}

export function fetchTransactions(userId: string) {
  return request<Transaction[]>(`/transactions?user_id=${userId}`)
}

export function fetchBudgets(userId: string) {
  return request<Budget[]>(`/budgets?user_id=${userId}`)
}

export function fetchInsights(userId: string) {
  return request<Insight[]>(`/insights?user_id=${userId}`)
}

export function fetchRiskFlags(userId: string) {
  return request<RiskFlag[]>(`/risk-flags?user_id=${userId}`)
}

export function createBudget(payload: { user_id: string; category: string; monthly_limit: number }) {
  return request<Budget>(`/budgets`, {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function updateBudget(
  budgetId: string | number,
  payload: { category?: string; monthly_limit?: number },
) {
  return request<Budget>(`/budgets/${budgetId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  })
}

export function createTransaction(payload: Record<string, unknown>) {
  return request(`/transactions`, {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
