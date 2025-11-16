"use client";

export default function Home() {
  const netWorth = 24250;
  const monthlySpend = 1580;
  const savingsRate = 32;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Top hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-sky-50/95 to-sky-100/90 p-6 mb-8 shadow-md">
        <div className="absolute -right-20 -top-24 h-52 w-52 bg-sky-200/60 blur-3xl rounded-full" />
        <div className="absolute -left-16 bottom-0 h-40 w-40 bg-cyan-100/70 blur-3xl rounded-full" />

        <div className="relative flex justify-between items-start">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-sky-500/80">
              Overview
            </p>
            <h1 className="text-3xl font-bold mt-1 text-slate-900">
              You are on track this month 🎯
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-md">
              Based on current spending, you are projected to stay under budget
              and hit two savings goals.
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">Net Worth</p>
            <p className="text-3xl font-semibold mt-1 text-slate-900">
              ${netWorth.toLocaleString()}
            </p>
            <p className="text-xs text-emerald-500 mt-1">+ $540 this month</p>
          </div>
        </div>
      </div>

      {/* Quick metrics */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <MetricCard
          label="Spent this month"
          value={`$${monthlySpend}`}
          sub="+$120 vs last month"
          tone="red"
        />
        <MetricCard
          label="Savings rate"
          value={`${savingsRate}%`}
          sub="Goal: 30%"
          tone="green"
        />
        <MetricCard
          label="Active subscriptions"
          value="7"
          sub="$94 per month"
          tone="amber"
        />
      </div>

      {/* Fake chart */}
      <div className="rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl p-6 mb-10 shadow-md">
        <h2 className="text-sm font-semibold mb-2 text-slate-800">
          Spending over time
        </h2>

        <div className="flex h-40 gap-3 items-end bg-sky-50/80 p-4 rounded-xl">
          {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className="mx-auto w-6 rounded-full bg-gradient-to-t from-sky-400 to-cyan-400"
                style={{ height: `${h}%` }}
              />
              <p className="text-[10px] mt-1 text-slate-500">W{i + 1}</p>
            </div>
          ))}
        </div>
      </div>
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
