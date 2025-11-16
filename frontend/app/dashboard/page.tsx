"use client";

import { useState } from "react";
import Image from "next/image";
import NavigationMenuDemo from "@/components/auth_2/menu";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">

      {/* 👉 YOUR COLLAPSIBLE SIDEBAR */}
      <NavigationMenuDemo setActiveTab={setActiveTab} />

      {/* 👉 MAIN CONTENT (moves depending on sidebar width) */}
      <div className="flex-1 ml-28 p-6 transition-all duration-500 ease-out">
        {activeTab === "home" && <AuroraHome />}
        {activeTab === "statistics" && <AuroraStatistics />}
        {activeTab === "profile" && <AuroraProfile />}
        {activeTab === "settings" && <AuroraSettings />}
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////
// HOME PAGE — PREMIUM UI
////////////////////////////////////////////////////////////////////////////////

function AuroraHome() {
  const netWorth = 24250;
  const monthlySpend = 1580;
  const savingsRate = 32;

  return (
    <div className="max-w-6xl mx-auto">

      {/* Top hero */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 mb-8">
        <div className="absolute -right-20 -top-20 h-52 w-52 bg-cyan-500/20 blur-3xl rounded-full" />
        <div className="absolute -left-12 bottom-0 h-40 w-40 bg-teal-500/20 blur-3xl rounded-full" />

        <div className="relative flex justify-between items-start">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-cyan-300/80">
              Overview
            </p>
            <h1 className="text-3xl font-bold mt-1">
              You are on track this month 🎯
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-md">
              Based on current spending, you are projected to stay under budget and hit 2 savings goals.
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Net Worth</p>
            <p className="text-3xl font-semibold mt-1">${netWorth.toLocaleString()}</p>
            <p className="text-xs text-emerald-400 mt-1">+ $540 this month</p>
          </div>
        </div>
      </div>

      {/* Quick metrics */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <MetricCard label="Spent this month" value={`$${monthlySpend}`} sub="+$120 vs last month" tone="red" />
        <MetricCard label="Savings rate" value={`${savingsRate}%`} sub="Goal: 30%" tone="green" />
        <MetricCard label="Active subscriptions" value="7" sub="$94 / month" tone="amber" />
      </div>

      {/* Fake chart */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 mb-10">
        <h2 className="text-sm font-semibold mb-2">Spending over time</h2>

        <div className="flex h-40 gap-3 items-end bg-slate-950/60 p-4 rounded-xl">
          {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="mx-auto w-6 rounded-full bg-gradient-to-t from-teal-500 to-cyan-400"
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

////////////////////////////////////////////////////////////////////////////////
// STATISTICS PAGE
////////////////////////////////////////////////////////////////////////////////

function AuroraStatistics() {
  const categories = [
    { name: "Housing", value: 920, color: "bg-blue-500" },
    { name: "Food", value: 340, color: "bg-green-500" },
    { name: "Transport", value: 120, color: "bg-yellow-500" },
    { name: "Entertainment", value: 95, color: "bg-purple-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Spending Statistics</h1>

      {/* Graph placeholder */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-72 flex items-center justify-center">
        <Image src="/graph.png" alt="Graph" width={420} height={300} />
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">Category Breakdown</h2>

      <div className="grid grid-cols-4 gap-6">
        {categories.map((c) => (
          <div key={c.name} className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 text-center shadow-lg">
            <div className={`h-3 w-3 rounded-full mx-auto mb-2 ${c.color}`} />
            <p className="font-semibold">{c.name}</p>
            <p className="text-xl font-bold mt-1">${c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////
// PROFILE PAGE
////////////////////////////////////////////////////////////////////////////////

function AuroraProfile() {
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <Image src="/profile.jpg" alt="Profile" width={70} height={70} className="rounded-xl" />
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-slate-400 text-sm">john.doe@aurora.app</p>
          </div>
        </div>

        <button className="mt-6 w-full rounded-xl bg-red-500 py-2 text-sm font-semibold hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////
// SETTINGS PAGE
////////////////////////////////////////////////////////////////////////////////

function AuroraSettings() {
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="mb-6">
          <p className="font-semibold text-sm text-slate-300 mb-1">Monthly Budget</p>
          <input className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700" placeholder="Enter budget..." />
        </div>

        <div className="mb-6">
          <p className="font-semibold text-sm text-slate-300 mb-1">Notifications</p>
          <select className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700">
            <option>Enable</option>
            <option>Disable</option>
          </select>
        </div>

        <div>
          <p className="font-semibold text-sm text-slate-300 mb-1">Theme</p>
          <select className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700">
            <option>Dark</option>
            <option>Light</option>
          </select>
        </div>
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////
// SMALL REUSABLE COMPONENT
////////////////////////////////////////////////////////////////////////////////

function MetricCard({ label, value, sub, tone }) {
  const toneMap = {
    red: "text-rose-400",
    green: "text-emerald-400",
    amber: "text-amber-300",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-md">
      <p className="text-xs uppercase text-slate-400 tracking-wider">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className={`mt-1 text-xs ${toneMap[tone]}`}>{sub}</p>
    </div>
  );
}
