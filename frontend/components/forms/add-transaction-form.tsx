"use client";

import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_FINEX_API_URL;
const DEFAULT_USER_ID = process.env.NEXT_PUBLIC_DEFAULT_USER_ID || "";

type Status = "idle" | "loading" | "success" | "error";

interface Props {
  onSuccess?: () => void
}

export default function AddTransactionForm({ onSuccess }: Props) {
  const [form, setForm] = useState({
    userId: DEFAULT_USER_ID,
    name: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    isSubscription: false,
    source: "manual",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!API_BASE_URL) {
      setStatus("error");
      setMessage("Missing NEXT_PUBLIC_FINEX_API_URL env variable.");
      return;
    }

    if (!form.userId) {
      setStatus("error");
      setMessage("User ID is required.");
      return;
    }

    const amountNumber = Number(form.amount);
    if (Number.isNaN(amountNumber)) {
      setStatus("error");
      setMessage("Amount must be a valid number.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: form.userId,
          name: form.name,
          amount: amountNumber,
          date: form.date,
          category: form.category || null,
          is_subscription: form.isSubscription,
          source: form.source || "manual",
          raw_json: { entered_via: "dashboard" },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.detail || response.statusText);
      }

      setStatus("success");
      setMessage("Transaction added successfully.");
      setForm((prev) => ({
        ...prev,
        name: "",
        amount: "",
        category: "",
        isSubscription: false,
      }));
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Failed to add transaction."
      );
    }
  };

  return (
    <div className="rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Add Manual Transaction
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase text-slate-500">User ID</label>
            <input
              type="text"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm"
              placeholder="UUID"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase text-slate-500">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase text-slate-500">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm"
              placeholder="e.g. Trader Joe's"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase text-slate-500">Amount</label>
            <input
              type="number"
              step="0.01"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase text-slate-500">
              Category (optional)
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm"
              placeholder="Groceries, Travel..."
            />
          </div>
          <div>
            <label className="text-xs uppercase text-slate-500">Source</label>
            <input
              type="text"
              name="source"
              value={form.source}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm"
              placeholder="manual"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            name="isSubscription"
            checked={form.isSubscription}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300"
          />
          Recurring subscription
        </label>

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 py-2 text-white font-semibold shadow"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving..." : "Save Transaction"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              status === "success" ? "text-emerald-600" : "text-rose-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
