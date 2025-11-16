"use client";

import { useEffect, useState } from "react";

import { createBudget, updateBudget } from "@/lib/api";
import { Budget } from "@/lib/types";

interface Props {
  budgets: Budget[];
  userId?: string;
  onBudgetsChanged: () => void;
}

export default function Setting({ budgets, userId, onBudgetsChanged }: Props) {
  const [createAmount, setCreateAmount] = useState("");
  const [updateAmount, setUpdateAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const currentBudget = budgets[0] || null;

  useEffect(() => {
    if (currentBudget) {
      setUpdateAmount(currentBudget.monthly_limit.toString());
    }
  }, [currentBudget]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setStatus("error");
      setMessage("User not loaded yet");
      return;
    }
    const amount = Number(createAmount);
    if (Number.isNaN(amount) || amount <= 0) {
      setStatus("error");
      setMessage("Enter a valid amount");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      await createBudget({
        user_id: userId,
        category: "Total Budget",
        monthly_limit: amount,
      });
      setStatus("success");
      setMessage("Budget saved");
      setCreateAmount("");
      onBudgetsChanged();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Failed to save budget"
      );
    }
  };

  const handleUpdate = async () => {
    if (!currentBudget) return;
    const value = Number(updateAmount);
    if (Number.isNaN(value) || value <= 0) {
      setStatus("error");
      setMessage("Enter a valid amount");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      await updateBudget(currentBudget.id, { monthly_limit: value });
      setStatus("success");
      setMessage("Budget updated");
      onBudgetsChanged();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Failed to update budget"
      );
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Settings</h1>

      <div className="bg-white/90 border border-white/70 rounded-3xl p-6 shadow-xl backdrop-blur-xl space-y-6">
        {!currentBudget ? (
          <form onSubmit={handleCreate} className="space-y-3">
            <p className="font-semibold text-xs uppercase text-slate-500">
              Set your monthly budget
            </p>
            <input
              type="number"
              className="w-full p-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-400 focus-visible:border-sky-400"
              placeholder="Monthly limit"
              value={createAmount}
              onChange={(e) => setCreateAmount(e.target.value)}
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-indigo-400 py-2 text-sm font-semibold text-white hover:brightness-110 hover:shadow-md transition"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Saving…" : "Save budget"}
            </button>
            {message && (
              <p
                className={`text-xs ${
                  status === "error" ? "text-rose-500" : "text-emerald-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        ) : (
          <div className="space-y-3">
            <p className="font-semibold text-xs uppercase text-slate-500">
              Update total monthly budget
            </p>
            <input
              type="number"
              className="w-full p-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-400 focus-visible:border-sky-400"
              value={updateAmount}
              onChange={(e) => setUpdateAmount(e.target.value)}
            />
            <button
              type="button"
              className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-indigo-400 py-2 text-sm font-semibold text-white hover:brightness-110 hover:shadow-md transition"
              disabled={status === "loading"}
              onClick={handleUpdate}
            >
              {status === "loading" ? "Saving…" : "Update budget"}
            </button>
            {message && (
              <p
                className={`text-xs ${
                  status === "error" ? "text-rose-500" : "text-emerald-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
