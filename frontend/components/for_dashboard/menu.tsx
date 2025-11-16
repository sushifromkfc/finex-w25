"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface NavigationMenuDemoProps {
  setActiveTab: (tab: string) => void;
}

export default function NavigationMenuDemo({
  setActiveTab,
}: NavigationMenuDemoProps) {
  const [collapsed, setCollapsed] = useState(false);

  //////////////////////////////////////////////////////////////////////
  // COLLAPSED STATE - SMALL ARROW BUTTON
  //////////////////////////////////////////////////////////////////////
  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="
          fixed top-1/2 -translate-y-1/2 left-3
          bg-sky-100/85 backdrop-blur-xl
          border border-sky-200
          shadow-md rounded-full p-2
          hover:scale-125 transition duration-300
        "
      >
        <ChevronRight size={18} className="text-sky-500" />
      </button>
    );
  }

  //////////////////////////////////////////////////////////////////////
  // EXPANDED SIDEBAR - PASTEL GLASS LOOK
  //////////////////////////////////////////////////////////////////////
  return (
    <div
      onClick={() => setCollapsed(true)}
      className="
        fixed top-1/4 left-6
        flex flex-col items-center gap-4
        px-4 py-6
        rounded-3xl
        bg-sky-100/80
        backdrop-blur-2xl
        border border-sky-200
        shadow-[0_0_25px_rgba(148,163,184,0.55)]
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
        src="/calendar.svg"
        alt="Calendar"
        onClick={() => setActiveTab("calendar")}
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
// ICON BUTTON - SOFT GLASS PASTEL STYLE
//////////////////////////////////////////////////////////////////////
interface IconButtonProps {
  src: string;
  alt: string;
  onClick: () => void;
}

function IconButton({ src, alt, onClick }: IconButtonProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="
        bg-white/80
        w-12 h-12 rounded-2xl
        flex items-center justify-center
        border border-sky-200
        shadow-md
        transition-all duration-300
        hover:scale-110
        hover:shadow-[0_0_18px_rgba(56,189,248,0.45)]
        hover:border-sky-400/70
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
