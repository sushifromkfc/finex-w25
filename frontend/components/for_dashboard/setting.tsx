"use client";

export default function Setting() {
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Settings</h1>

      <div className="bg-white/90 border border-white/70 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
        <div className="mb-6">
          <p className="font-semibold text-sm text-slate-700 mb-1">
            Monthly Budget
          </p>
          <input
            className="w-full p-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-400 focus-visible:border-sky-400"
            placeholder="Enter budget..."
          />
        </div>

        <div className="mb-6">
          <p className="font-semibold text-sm text-slate-700 mb-1">
            Notifications
          </p>
          <select className="w-full p-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus-visible:ring-sky-400 focus-visible:border-sky-400">
            <option>Enable</option>
            <option>Disable</option>
          </select>
        </div>

        <div>
          <p className="font-semibold text-sm text-slate-700 mb-1">Theme</p>
          <select className="w-full p-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus-visible:ring-sky-400 focus-visible:border-sky-400">
            <option>Dark</option>
            <option>Light</option>
          </select>
        </div>
      </div>
    </div>
  );
}
