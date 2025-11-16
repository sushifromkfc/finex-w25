"use client";

import { useMemo } from "react";

import AddTransactionForm from "@/components/forms/add-transaction-form";
import {
  Budget,
  Insight,
  RiskFlag,
  Transaction,
  UserProfile,
} from "@/lib/types";

interface Props {
  user: UserProfile | null;
  transactions: Transaction[];
  budgets: Budget[];
  insights: Insight[];
  riskFlags: RiskFlag[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export default function Home({
  user,
  transactions,
  budgets,
  insights,
  riskFlags,
  loading,
  error,
  onRefresh,
}: Props) {
  const monthKey = new Date().toISOString().slice(0, 7);
  const todayLabel = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const dateParts = (value?: string) => {
    const iso = (value || "").split("T")[0];
    const [year, month, day] = iso.split("-").map((part) => Number(part));
    return { year, month, day };
  };

  const dateLabel = (value?: string) => {
    const { month, day, year } = dateParts(value);
    if (!month || !day || !year) return "--";
    return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(
      undefined,
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      }
    );
  };

  const dateComparable = (value?: string) => {
    const { year, month, day } = dateParts(value);
    return Date.UTC(year || 0, (month || 1) - 1, day || 1);
  };

  const monthlyTransactions = useMemo(
    () =>
      transactions.filter(
        (tx) => String(tx.date ?? "").slice(0, 7) === monthKey
      ),
    [transactions, monthKey]
  );

  const spentThisMonth = monthlyTransactions.reduce(
    (sum, tx) => sum + Number(tx.amount || 0),
    0
  );

  const totalBudget = budgets.reduce(
    (sum, budget) => sum + Number(budget.monthly_limit || 0),
    0
  );

  const budgetRemaining = Math.max(totalBudget - spentThisMonth, 0);
  const savingsRate = totalBudget
    ? Math.max(((totalBudget - spentThisMonth) / totalBudget) * 100, 0)
    : null;

  const activeSubscriptions = transactions.filter(
    (tx) => tx.is_subscription
  ).length;

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => dateComparable(b.date) - dateComparable(a.date))
      .slice(0, 6);
  }, [transactions]);

  const budgetUsagePercent = useMemo(() => {
    if (!totalBudget) return 0;
    const used = spentThisMonth / totalBudget;
    return Math.min(Math.max(used * 100, 0), 100); // 0~100
  }, [spentThisMonth, totalBudget]);

  const usageColor = useMemo(() => {
    if (budgetUsagePercent >= 80) return "bg-rose-500";
    if (budgetUsagePercent >= 50) return "bg-amber-400";
    return "bg-emerald-500";
  }, [budgetUsagePercent]);

  const latestInsight = insights[0];
  const highlightFlags = riskFlags.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-sky-50/95 to-sky-100/90 p-6 shadow-md">
        <div className="absolute -right-20 -top-24 h-52 w-52 bg-sky-200/60 blur-3xl rounded-full" />
        <div className="absolute -left-16 bottom-0 h-40 w-40 bg-cyan-100/70 blur-3xl rounded-full" />

        <div className="relative flex justify-between items-start gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-sky-500/80">
              Overview
            </p>
            <h1 className="text-3xl font-bold mt-1 text-slate-900">
              Hi, {user?.full_name || "Finex member"}. It's {todayLabel}.
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-lg">
              {latestInsight
                ? latestInsight.description
                : "Add transactions to see personalized insights."}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">Budget remaining vs spend</p>
            <p className="text-3xl font-semibold mt-1 text-slate-900">
              ${budgetRemaining.toFixed(2)}
              <span className="text-base text-slate-500">
                {" "}
                / ${spentThisMonth.toFixed(2)}
              </span>
            </p>
            <p className="text-xs text-emerald-500 mt-1">
              <div className="mt-1">
                <p className="text-xs text-emerald-500">
                  {budgetRemaining > 0 ? "On track" : "Budget exceeded"}
                </p>

                <div className="mt-3">
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ease-out ${usageColor}`}
                      style={{ width: `${budgetUsagePercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {budgetUsagePercent.toFixed(0)}% used
                  </p>
                </div>
              </div>
              {budgetRemaining > 0 ? "On track" : "Budget exceeded"}
            </p>
          </div>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading live data…</p>}
      {error && (
        <p className="text-sm text-rose-500">Failed to load data: {error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Spent this month"
          value={`$${spentThisMonth.toFixed(2)}`}
          sub={`${monthlyTransactions.length} transactions`}
          tone="red"
        />
        <MetricCard
          label="Budget remaining"
          value={`$${budgetRemaining.toFixed(2)}`}
          sub={totalBudget ? `of $${totalBudget.toFixed(2)}` : "No budgets yet"}
          tone="green"
        />
        <MetricCard
          label="Active subscriptions"
          value={`${activeSubscriptions}`}
          sub={
            activeSubscriptions
              ? "Tracked from transactions"
              : "Add recurring spend"
          }
          tone="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Recent transactions
            </h2>
            <span className="text-xs text-slate-500">
              {transactions.length} total
            </span>
          </div>
          <div className="space-y-3">
            {recentTransactions.length === 0 && (
              <p className="text-xs text-slate-500">
                No transactions yet. Add one below.
              </p>
            )}
            {recentTransactions.map((tx) => (
              <div
                key={`${tx.id}-${tx.date}`}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-900">{tx.name}</p>
                  <p className="text-xs text-slate-500">
                    {dateLabel(tx.date)} · {tx.category || "Uncategorized"}
                  </p>
                </div>
                <p className="font-semibold text-slate-900">
                  ${Number(tx.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl p-6 shadow-md">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">
            Risk flags & insights
          </h2>
          {highlightFlags.length === 0 && !latestInsight && (
            <p className="text-xs text-slate-500">
              No alerts yet. The Auditor agent will flag unusual activity.
            </p>
          )}
          <div className="space-y-3">
            {latestInsight && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3">
                <p className="text-xs uppercase text-emerald-600 font-semibold">
                  Latest insight
                </p>
                <p className="text-sm text-slate-800 mt-1">
                  {latestInsight.description}
                </p>
              </div>
            )}
            {highlightFlags.map((flag) => (
              <div
                key={flag.id}
                className="rounded-2xl border border-rose-200 bg-rose-50/80 p-3"
              >
                <p className="text-xs uppercase text-rose-600 font-semibold">
                  {flag.flag_type}
                </p>
                <p className="text-sm text-slate-700 mt-1">
                  {flag.details?.reason || "See risk flag details in backend."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddTransactionForm onSuccess={onRefresh} />
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  tone: "red" | "green" | "amber";
}

function MetricCard({ label, value, sub, tone }: MetricCardProps) {
  const toneMap: Record<MetricCardProps["tone"], string> = {
    red: "text-rose-500",
    green: "text-emerald-500",
    amber: "text-amber-500",
  };

  return (
    <div className="rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl p-5 shadow-md">
      <p className="text-xs uppercase text-slate-500 tracking-wider">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <p className={`mt-1 text-xs ${toneMap[tone]}`}>{sub}</p>
    </div>
  );
}
