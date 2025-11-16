"use client";

import { auth } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  function handleLogout() {
    signOut(auth).then(() => {
      router.push("/login");
    });
  }

  const user = auth.currentUser;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Finex Dashboard 🎉</h1>

      {/* 유저 정보 보여주기 */}
      {user ? (
        <p className="mb-6 text-lg">
          Logged in as <span className="font-semibold">{user.email}</span>
        </p>
      ) : (
        <p className="mb-6 text-lg text-red-500">No user found.</p>
      )}

      {/* 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
