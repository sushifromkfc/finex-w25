import { SignupForm } from "@/components/auth/SignUpForm";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-slate-50 to-indigo-100 px-4">
      {/* 배경 데코 */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 bg-sky-200/70 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 bg-indigo-200/70 blur-3xl rounded-full" />

      <SignupForm />
    </div>
  );
}
