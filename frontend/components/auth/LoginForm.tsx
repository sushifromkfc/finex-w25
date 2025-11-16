"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const provider = new GoogleAuthProvider();

  function letLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("good", user);
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  }

  function letGoogleLogin() {
    setError(null);

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("google login good", user);
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-slate-50 to-indigo-100 px-4">
      {/* 배경 데코 */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 bg-sky-200/70 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 bg-indigo-200/70 blur-3xl rounded-full" />

      {/* Card 애니메이션 */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <Card className="w-full border-white/60 bg-white/70 backdrop-blur-xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button
                variant="link"
                type="button"
                onClick={() => router.push("/signup")}
                className="text-sky-600 hover:text-sky-700"
              >
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={letLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    className="h-10 bg-white/70 border-slate-200 focus-visible:ring-sky-400"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => onChangePassword(e.target.value)}
                    className="h-10 bg-white/70 border-slate-200 focus-visible:ring-sky-400"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-600 whitespace-pre-line"
                  >
                    {error}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  className="w-full h-10 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button
              variant="outline"
              className="w-full h-10 rounded-full bg-white/80 border-slate-200 hover:bg-slate-50"
              type="button"
              onClick={letGoogleLogin}
            >
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
