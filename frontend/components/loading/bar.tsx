// components/site-header.tsx
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  const router = useRouter();

  return (
    <header className="w-full flex justify-center pt-6">
      <div className="flex w-full max-w-5xl items-center justify-between rounded-full bg-sky-50/80 px-6 py-3 shadow-lg ring-1 ring-sky-100 backdrop-blur">
        <div className="flex items-center gap-10">
          <span className="text-2xl font-black tracking-tight">FINEX</span>

          <nav className="hidden md:flex items-center gap-6 text-base">
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              Calendar
            </Link>
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              About Us
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="hidden text-slate-500 hover:text-slate-900 transition-colors md:inline"
            onClick={() => router.push("/login")}
          >
            Log in
          </button>

          <Button
            className="rounded-full bg-black text-white px-6 h-10 hover:bg-black/90"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
