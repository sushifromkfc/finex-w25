"use client";

import Image from "next/image";

export default function Statistics() {
  const categories = [
    { name: "Housing", value: 920, color: "bg-blue-400" },
    { name: "Food", value: 340, color: "bg-emerald-400" },
    { name: "Transport", value: 120, color: "bg-amber-400" },
    { name: "Entertainment", value: 95, color: "bg-violet-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Spending Statistics
      </h1>

      <div className="bg-white/90 border border-white/70 rounded-3xl p-6 h-72 flex items-center justify-center shadow-md backdrop-blur-xl">
        <Image src="/graph.png" alt="Graph" width={420} height={300} />
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-slate-900">
        Category Breakdown
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c.name}
            className="rounded-3xl bg-white/90 border border-white/70 p-6 text-center shadow-md backdrop-blur-xl"
          >
            <div className={`h-3 w-3 rounded-full mx-auto mb-2 ${c.color}`} />
            <p className="font-semibold text-slate-900">{c.name}</p>
            <p className="text-xl font-bold mt-1 text-slate-900">${c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
