// components/site-header.tsx
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  const router = useRouter();

  return (
    <div
      className="
        w-full 
        flex flex-col items-center
        bg-gradient-to-b from-sky-50 via-white to-blue-50
      "
    >
      {/* ========================= HEADER ========================= */}
      <header className="w-full flex justify-center pt-6">
        <div className="flex w-full max-w-5xl items-center justify-between rounded-full bg-sky-50/80 px-6 py-3 shadow-lg ring-1 ring-sky-100 backdrop-blur-lg">
          <div className="flex items-center gap-10">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight">FINEX</span>

            <nav className="hidden md:flex items-center gap-6 text-base">
              <Link href="#" className="text-slate-500 hover:text-slate-900">Dashboard</Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900">Calendar</Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900">About Us</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="hidden md:inline text-slate-500 hover:text-slate-900"
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

      {/* Spacer */}
      <div className="h-28" />

      {/* ========================= HERO ========================= */}
      <section className="w-full text-center flex flex-col items-center px-6">
        <h1 className="text-5xl font-bold text-slate-800 max-w-3xl leading-tight">
          Smart, Simple Budgeting for a Healthier Financial Life
        </h1>

        <p className="text-slate-500 text-lg max-w-2xl mt-6">
          FINEX helps you track spending, understand habits, and stay in control with AI-powered insights.
        </p>

        <button
          onClick={() => router.push("/signup")}
          className="mt-8 px-12 py-4 bg-sky-600 text-white rounded-full text-lg shadow-xl hover:bg-sky-700 transition"
        >
          Start Saving Today
        </button>
      </section>

      {/* Divider */}
      <SectionDivider />

      {/* ========================= FEATURES ========================= */}
      <h2 className="text-4xl font-bold text-center mt-10">What FINEX Offers</h2>

      <section className="px-6 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mt-16 max-w-5xl">
          <Feature
            title="Real-Time Tracking"
            text="Every purchase logged instantly — no manual input."
            img="/globe.svg"
          />
          <Feature
            title="Smart Budget Alerts"
            text="Get notified before overspending happens."
            img="/setting_n.png"
          />
          <Feature
            title="AI Financial Insights"
            text="Personalized guidance based on your spending patterns."
            img="/profile_n.png"
          />
        </div>
      </section>

      {/* Divider */}
      <SectionDivider />

      {/* ========================= PROMO BANNER ========================= */}
      <section className="w-full flex justify-center px-6">
        <div className="max-w-5xl w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-3xl p-12 shadow-xl flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-3xl font-bold">Track. Learn. Grow.</h2>
          <p className="text-white/90 max-w-md mt-6 md:mt-0">
            FINEX analyzes your monthly habits and alerts you before overspending happens.
          </p>
          <Button
            onClick={() => router.push("/signup")}
            className="bg-white text-sky-700 hover:bg-white/90 font-semibold rounded-full px-6 py-3 mt-6 md:mt-0"
          >
            Try It Free
          </Button>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider />

      {/* ========================= USER GRID SECTION ========================= */}
      <h2 className="text-4xl font-bold text-center mt-10 mb-12">
        How people use Finex
      </h2>

      <section className="w-full flex justify-center px-6 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 max-w-6xl">
          {[1, 2, 3, 4].map((id) => (
            <UserCard key={id} index={id} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <SectionDivider />

      {/* ========================= FOOTER ========================= */}
      <footer className="py-16 text-center text-slate-600">
        © {new Date().getFullYear()} FINEX — All rights reserved.
      </footer>
    </div>
  );
}

/* ========================= REUSABLE DIVIDER ========================= */
function SectionDivider() {
  return (
    <div className="w-full flex justify-center mt-28 mb-10">
      <div className="h-[2px] w-2/3 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </div>
  );
}

/* ========================= FEATURE CARD ========================= */
function Feature({ title, text, img }) {
  return (
    <div className="bg-white shadow-lg rounded-3xl p-10 text-center border border-slate-100 hover:shadow-2xl transition">
      <img src={img} className="w-16 mx-auto mb-5 opacity-80 rounded-xl" />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-500 mt-3">{text}</p>
    </div>
  );
}

/* ========================= USER CARD ========================= */
/* ========================= USER CARD ========================= */
function UserCard({ index }) {
  const users = [
    {
      name: "Samuel Park",
      role: "Bassist",
      text: "FINEX helps me keep my monthly expenses organized so I can focus on making music.",
      img: "/junyoung.png",
    },
    {
      name: "Jun Koo",
      role: "Business Man",
      text: "The spending pattern analysis is extremely useful for managing both personal and business finances.",
      img: "/jkoo.jpg",
    },
    {
      name: "Seungming Lee",
      role: "Rapper",
      text: "Tracking project budgets has never been easier — FINEX keeps my creative work stress-free.",
      img: "/seungmin.png",
    },
    {
      name: "Aiden Kim",
      role: "Electrician",
      text: "The AI-powered spending insights are my favorite feature. Clear, accurate, and genuinely helpful.",
      img: "/taewoo.png",
    },
  ];

  const user = users[index - 1];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-44 h-56 rounded-3xl overflow-hidden shadow-md bg-slate-100">
        <img src={user.img} className="w-full h-full object-cover" />
      </div>

      <h3 className="text-lg font-bold mt-4">
        {user.name}
        <span className="text-slate-500 font-normal">, {user.role}</span>
      </h3>

      <p className="text-slate-600 text-sm mt-2">{user.text}</p>
    </div>
  );
}

