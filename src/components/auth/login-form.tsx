"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "./google-button";
import AuthDivider from "./auth-divider";
import PasswordField from "./password-field";
import AuthError from "./auth-error";
import { createClient } from "@/lib/supabase/client";

type LoginState = "idle" | "loading" | "google-loading" | "error" | "success";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<LoginState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  function validate(): boolean {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setState("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setState("error");
      if (error.message.includes("Invalid login")) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else if (error.message.includes("Email not confirmed")) {
        setErrorMessage("Please verify your email address before signing in.");
      } else {
        setErrorMessage(error.message);
      }
      return;
    }

    setState("success");
    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleClick() {
    setState("google-loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setState("error");
      setErrorMessage("Failed to connect with Google. Please try again.");
    }
    // No need to set success — OAuth redirects away from the page
  }

  if (state === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" aria-hidden="true">
            <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-[18px] font-semibold text-foreground mb-1">
          Welcome back!
        </h2>
        <p className="text-[14px] text-muted-foreground">
          Redirecting you to the dashboard...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-1 mb-1">
        <h1 className="text-[22px] font-semibold text-foreground tracking-tight">
          Welcome back
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Sign in to continue creating.
        </p>
      </div>

      <div className="mt-6">
        <GoogleButton
          onClick={handleGoogleClick}
          loading={state === "google-loading"}
          type="button"
        />
      </div>

      <AuthDivider />

      {errorMessage && (
        <div className="mb-4">
          <AuthError message={errorMessage} />
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[13px] font-medium text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            autoComplete="email"
            className={`h-11 text-[14px] ${
              fieldErrors.email
                ? "border-destructive focus-visible:ring-destructive/20"
                : ""
            }`}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="email-error" className="text-[12px] text-destructive" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <PasswordField
          value={password}
          onChange={(val) => {
            setPassword(val);
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
          error={fieldErrors.password}
          autoComplete="current-password"
        />

        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-[14px] font-medium mt-6"
        disabled={state === "loading"}
      >
        {state === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </Button>

      <p className="text-center text-[13px] text-muted-foreground mt-6">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
