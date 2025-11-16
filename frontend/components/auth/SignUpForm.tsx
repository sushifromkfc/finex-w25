"use client";

import { useState, type FormEvent, type ComponentProps } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function SignupForm({ ...props }: ComponentProps<typeof Card>) {
  const router = useRouter();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const provider = new GoogleAuthProvider();

  function letSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  }

  function letGoogleSignUp() {
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
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <Card
        {...props}
        className={`relative w-full overflow-hidden border border-white/60 bg-white/70 shadow-2xl backdrop-blur-xl ${
          props.className ?? ""
        }`}
      >
        <div className="pointer-events-none absolute inset-x-10 -top-20 h-32 rounded-full bg-gradient-to-br from-sky-200/60 to-indigo-200/60 blur-3xl" />

        <CardHeader className="relative pb-4">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="relative pb-4">
          <form onSubmit={letSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => onChangeEmail(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => onChangePassword(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-600 whitespace-pre-line"
                >
                  {error}
                </motion.p>
              )}

              <FieldGroup>
                <Field>
                  <div className="mt-3 flex flex-col gap-3">
                    <Button className="h-10 w-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
                      Create Account
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={letGoogleSignUp}
                      className="h-10 w-full rounded-full"
                    >
                      Sign up with Google
                    </Button>

                    <FieldDescription className="pt-1 text-center text-xs">
                      Already have an account?
                      <Button
                        variant="link"
                        type="button"
                        onClick={() => router.push("/login")}
                        className="px-1 text-xs text-sky-600"
                      >
                        Sign in
                      </Button>
                    </FieldDescription>
                  </div>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
