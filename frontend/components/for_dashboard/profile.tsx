"use client";

import Image from "next/image";

export default function Profile() {
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">My Profile</h1>

      <div className="bg-white/90 rounded-3xl border border-white/70 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={70}
            height={70}
            className="rounded-xl"
          />
          <div>
            <h2 className="text-xl font-semibold text-slate-900">John Doe</h2>
            <p className="text-slate-500 text-sm">john.doe@aurora.app</p>
          </div>
        </div>

        <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-400 to-indigo-400 py-2 text-sm font-semibold text-white hover:brightness-110 hover:shadow-md transition">
          Logout
        </button>
      </div>
    </div>
  );
}
