"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavigationMenuDemo({ setActiveTab }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <div
      onClick={() => setCollapsed(!collapsed)}
      className={`
        fixed left-6 top-1/4
        flex flex-col items-center gap-5
        px-4 py-6
        rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl
        transition-all duration-300 cursor-pointer
        ${collapsed ? "w-16" : "w-20"}
      `}
    >
      {/* ========================================================= */}
      {/*                FINEX LOGO BUTTON (New)                  */}
      {/* ========================================================= */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // prevent collapsing
          router.push("/"); // <--- REDIRECT TO LOADING PAGE
        }}
        className="bg-black text-white w-14 h-14 rounded-3xl flex items-center justify-center shadow-lg hover:bg-black/90 transition"
      >
        <span className="text-3xl font-extrabold tracking-tight">F</span>
      </div>

      {/* ICON 1 — HOME */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveTab("home");
        }}
        className="bg-white w-14 h-14 rounded-3xl flex items-center justify-center shadow-md"
      >
        <Image src="/globe.svg" width={40} height={40} alt="Home" />
      </div>

      {/* ICON 2 — STATISTICS */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveTab("statistics");
        }}
        className="bg-white w-14 h-14 rounded-3xl flex items-center justify-center shadow-md"
      >
        <Image src="/stat_n.png" width={40} height={40} alt="Stats" />
      </div>

      {/* ICON 3 — PROFILE */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveTab("profile");
        }}
        className="bg-white w-14 h-14 rounded-3xl flex items-center justify-center shadow-md"
      >
        <Image src="/profile_n.png" width={40} height={40} alt="Profile" />
      </div>

      {/* ICON 4 — SETTINGS */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveTab("settings");
        }}
        className="bg-white w-14 h-14 rounded-3xl flex items-center justify-center shadow-md"
      >
        <Image src="/setting_n.png" width={40} height={40} alt="Settings" />
      </div>

      {/* ICON 5 — CALENDAR */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveTab("calendar");
        }}
        className="bg-white w-14 h-14 rounded-3xl flex items-center justify-center shadow-md"
      >
        <Image src="/calendar_n.svg" width={40} height={40} alt="Calendar" />
      </div>
    </div>
  );
}
