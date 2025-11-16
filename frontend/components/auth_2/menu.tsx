"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function NavigationMenuDemo({ setActiveTab }) {
  const [collapsed, setCollapsed] = useState(false);

  //////////////////////////////////////////////////////////////////////
  // COLLAPSED STATE → SHOW SMALL ARROW
  //////////////////////////////////////////////////////////////////////
  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="
          fixed top-1/2 -translate-y-1/2 left-3
          bg-slate-900/70 backdrop-blur-xl
          border border-slate-800
          shadow-xl rounded-full p-2
          hover:scale-125 transition duration-300
        "
      >
        <ChevronRight size={18} className="text-cyan-300" />
      </button>
    );
  }

  //////////////////////////////////////////////////////////////////////
  // EXPANDED SIDEBAR — DARK THEME
  //////////////////////////////////////////////////////////////////////
  return (
    <div
      onClick={() => setCollapsed(true)}
      className="
        fixed top-1/4 left-6
        flex flex-col items-center gap-4
        px-4 py-6
        rounded-3xl
        bg-slate-900/60 backdrop-blur-2xl
        border border-slate-800
        shadow-[0_0_20px_rgba(0,0,0,0.6)]
        transition-all duration-500
        cursor-pointer
        w-24
      "
    >
      <IconButton
        src="/globe.svg"
        alt="Home"
        onClick={() => setActiveTab("home")}
      />

      <IconButton
        src="/stat.jpg"
        alt="Statistics"
        onClick={() => setActiveTab("statistics")}
      />

      <IconButton
        src="/profile.jpg"
        alt="Profile"
        onClick={() => setActiveTab("profile")}
      />

      <IconButton
        src="/settings.jpg"
        alt="Settings"
        onClick={() => setActiveTab("settings")}
      />
    </div>
  );
}

//////////////////////////////////////////////////////////////////////
// ICON BUTTON — DARK GLASS STYLE WITH NEON HOVER
//////////////////////////////////////////////////////////////////////
function IconButton({ src, alt, onClick }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="
        bg-slate-800/60
        w-12 h-12 rounded-2xl
        flex items-center justify-center
        border border-slate-700
        shadow-lg
        transition-all duration-300

        hover:scale-110
        hover:shadow-[0_0_12px_rgba(0,255,255,0.5)]
        hover:border-cyan-400/60
      "
    >
      <Image
        src={src}
        alt={alt}
        width={22}
        height={22}
        className="opacity-80 hover:opacity-100 transition"
      />
    </div>
  );
}
