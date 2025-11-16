"use client";

import { useState } from "react";
import NavigationMenuDemo from "@/components/for_dashboard/menu";
import Home from "@/components/for_dashboard/home";
import Statistics from "@/components/for_dashboard/statistics";
import Profile from "@/components/for_dashboard/profile";
import Setting from "@/components/for_dashboard/setting";
import Month from "@/components/for_dashboard/month";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 text-slate-900">
      {/* 파스텔 배경 블러 구름 */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 bg-sky-200/55 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 bg-indigo-200/40 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-10 h-56 w-56 bg-cyan-100/60 blur-3xl rounded-full" />

      {/* 사이드바 */}
      <div className="relative z-10">
        <NavigationMenuDemo setActiveTab={setActiveTab} />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex-1 ml-28 p-6 transition-all duration-500 ease-out">
        {activeTab === "home" && <Home />}
        {activeTab === "statistics" && <Statistics />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "settings" && <Setting />}
        {activeTab === "calendar" && <Month />}
      </div>
    </div>
  );
}
