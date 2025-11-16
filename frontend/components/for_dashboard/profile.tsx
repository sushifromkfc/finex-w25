"use client";

import { Budget, UserProfile } from "@/lib/types";

interface Props {
  user: UserProfile | null;
  budgets: Budget[];
}

export default function Profile({ user, budgets }: Props) {
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">My profile</h1>

      <div className="bg-white/90 rounded-3xl border border-white/70 p-6 shadow-xl backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase text-slate-500 tracking-widest">
            Name
          </p>
          <p className="text-xl font-semibold text-slate-900 mt-1">
            {user?.full_name || "Unnamed user"}
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase text-slate-500 tracking-widest">
            Email
          </p>
          <p className="text-sm text-slate-700 mt-1">
            {user?.email || "No email on file"}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-3">
            <p className="text-xs text-slate-500 uppercase">Budgets</p>
            <p className="text-lg font-semibold text-slate-900">
              {budgets.length}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-3">
            <p className="text-xs text-slate-500 uppercase">Joined</p>
            <p className="text-lg font-semibold text-slate-900">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
