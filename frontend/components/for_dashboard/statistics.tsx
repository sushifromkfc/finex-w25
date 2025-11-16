"use client";

import { useMemo } from "react";

import { Transaction } from "@/lib/types";

interface Props {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export default function Statistics({ transactions, loading, error }: Props) {
  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.forEach((tx) => {
      const key = tx.category || "Uncategorized";
      map[key] = (map[key] || 0) + Number(tx.amount || 0);
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = byCategory.reduce((sum, c) => sum + c.value, 0);

  const dailySeries = useMemo(() => {
    const map = new Map<string, number>();
    transactions.forEach((tx) => {
      const dateKey = (tx.date || "").split("T")[0];
      if (!dateKey) return;
      map.set(dateKey, (map.get(dateKey) || 0) + Number(tx.amount || 0));
    });
    return Array.from(map.entries())
      .sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]))
      .map(([date, value]) => ({ date, value }));
  }, [transactions]);

  const graphPoints = useMemo(() => {
    if (dailySeries.length === 0) return "";
    const maxValue = Math.max(...dailySeries.map((item) => item.value));
    const safeMax = maxValue || 1;
    return dailySeries
      .map((item, index) => {
        const x = (index / Math.max(dailySeries.length - 1, 1)) * 100;
        const y = 100 - (item.value / safeMax) * 100;
        return `${x},${y}`;
      })
      .join(" ");
  }, [dailySeries]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Spending statistics</h1>

      {loading && <p className="text-sm text-slate-500">Loading…</p>}
      {error && (
        <p className="text-sm text-rose-500">Failed to load data: {error}</p>
      )}

      <div className="bg-white/90 border border-white/70 rounded-3xl p-6 shadow-md backdrop-blur-xl space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 mb-3">
            Daily spending trend
          </h2>
          {dailySeries.length === 0 ? (
            <p className="text-xs text-slate-500">
              No transactions yet. Add data to see the chart.
            </p>
          ) : (
            <div className="h-64 bg-slate-50/80 border border-slate-100 rounded-2xl p-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polyline
                  fill="none"
                  strokeWidth={2}
                  stroke="url(#trendGradient)"
                  points={graphPoints}
                />
                <defs>
                  <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>{dailySeries[0]?.date}</span>
                <span>{dailySeries[dailySeries.length - 1]?.date}</span>
              </div>
            </div>
          )}
        </div>

        <h2 className="text-sm font-semibold text-slate-800 mb-3">
          Top categories this month
        </h2>
        {byCategory.length === 0 ? (
          <p className="text-xs text-slate-500">
            No transactions available. Add a transaction to see analytics.
          </p>
        ) : (
          <div className="space-y-3">
            {byCategory.slice(0, 6).map((category) => {
              const percent = total ? (category.value / total) * 100 : 0;
              return (
                <div key={category.name} className="text-sm">
                  <div className="flex justify-between text-slate-700">
                    <p className="font-semibold">{category.name}</p>
                    <p>
                      ${category.value.toFixed(2)} · {percent.toFixed(0)}%
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 mt-1">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
