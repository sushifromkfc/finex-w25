"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-2xl ring-1 ring-slate-200/40",
          title: "text-sm font-semibold text-slate-900",
          description: "text-xs text-slate-600",
          actionButton:
            "rounded-full px-3 py-1 text-xs font-medium bg-slate-900 text-white",
          cancelButton:
            "rounded-full px-3 py-1 text-xs font-medium border border-slate-300 text-slate-700",
        },
        style: {
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.18)",
        },
      }}
    />
  );
}
