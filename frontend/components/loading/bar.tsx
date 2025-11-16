// components/site-header.tsx
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  const router = useRouter();

  return (
    <>
      {/* -------------------- HEADER -------------------- */}
      <header className="w-full flex justify-center pt-10">
        <div className="flex w-full max-w-5xl items-center justify-between rounded-full bg-sky-50/80 px-6 py-3 shadow-lg ring-1 ring-sky-100 backdrop-blur">
          <div className="flex items-center gap-10">
            <span className="text-3xl font-black tracking-tight">FINEX</span>

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

      {/* -------------------- HERO SECTION -------------------- */}
      <section className="w-full flex flex-col items-center text-center mt-20 px-6">
        <h1 className="text-5xl font-bold text-slate-800 max-w-3xl leading-tight">
          Smart, Simple Budgeting for a Healthier Financial Life
        </h1>

        <p className="text-slate-500 text-lg max-w-2xl mt-4">
          FINEX helps you track spending, understand your habits, and stay in
          control with AI-powered insights — all in one clean dashboard.
        </p>

        <button
          onClick={() => router.push("/signup")}
          className="mt-6 px-10 py-4 bg-sky-600 text-white rounded-full text-lg shadow-lg hover:bg-sky-700 transition"
        >
          Start Saving Today
        </button>

        <img
          src="/stat.jpg"
          alt="Finance Overview"
          className="w-full max-w-4xl mt-14 rounded-3xl shadow-xl"
        />
      </section>

      {/* -------------------- PROMO BANNER -------------------- */}
      <section className="mt-20 w-full flex justify-center">
        <div className="max-w-5xl w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-3xl p-10 shadow-xl flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-3xl font-bold">
            Track. Learn. Grow.
          </h2>
          <p className="text-white/90 max-w-md mt-4 md:mt-0">
            FINEX analyzes your monthly habits and alerts you before overspending happens.
          </p>
          <Button
            onClick={() => router.push("/signup")}
            className="bg-white text-sky-700 hover:bg-white/90 font-semibold rounded-full px-6 py-3 ml-0 md:ml-4 mt-6 md:mt-0"
          >
            Try It Free
          </Button>
        </div>
      </section>

      {/* -------------------- FEATURES -------------------- */}
      <section className="mt-28 px-6 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-slate-800">What FINEX Offers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-14 max-w-5xl">

          <div className="bg-white shadow-lg rounded-3xl p-8 text-center border border-slate-100">
            <img src="/globe.svg" className="w-16 mx-auto mb-5 opacity-80" />
            <h3 className="text-xl font-bold">Real-Time Tracking</h3>
            <p className="text-slate-500 mt-2">
              Every purchase logged instantly. No manual input needed.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-3xl p-8 text-center border border-slate-100">
            <img src="/settings.jpg" className="w-16 mx-auto mb-5 rounded-xl opacity-80" />
            <h3 className="text-xl font-bold">Smart Budget Alerts</h3>
            <p className="text-slate-500 mt-2">
              Get notified before you overspend — stay within your goals.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-3xl p-8 text-center border border-slate-100">
            <img src="/profile.jpg" className="w-16 mx-auto mb-5 rounded-xl opacity-80" />
            <h3 className="text-xl font-bold">AI Financial Insights</h3>
            <p className="text-slate-500 mt-2">
              Personalized guidance based on real spending patterns.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------- TRUST BADGES -------------------- */}
      <section className="mt-28 flex flex-col items-center text-center">
        <p className="text-slate-500 text-lg">Trusted by students, freelancers, and professionals</p>

        <div className="flex gap-10 mt-6 opacity-80">
          <img src="/vercel.svg" className="w-20" />
          <img src="/next.svg" className="w-20" />
          <img src="/globe.svg" className="w-20" />
        </div>
      </section>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="mt-28 py-10 text-center text-slate-600">
        © {new Date().getFullYear()} FINEX — All rights reserved.
      </footer>
    </>
  );
}
