"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthError from "./auth-error";
import { createClient } from "@/lib/supabase/client";

type ForgotState = "idle" | "loading" | "sent" | "error";

export default function ForgotPasswordForm() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ForgotState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      setFieldError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError("Please enter a valid email address");
      return;
    }

    setFieldError("");
    setState("loading");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      setState("error");
      setErrorMessage(error.message);
      return;
    }

    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-[18px] font-semibold text-foreground mb-1">
          Check your email
        </h2>
        <p className="text-[14px] text-muted-foreground mb-6">
          We sent a password reset link to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="h-10 text-[13px] w-full"
            onClick={() => {
              setState("idle");
              setEmail("");
            }}
          >
            Use a different email
          </Button>
          <a
            href="/login"
            className="block text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-1 mb-1">
        <h1 className="text-[22px] font-semibold text-foreground tracking-tight">
          Reset your password
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {errorMessage && (
        <div className="mt-6 mb-4">
          <AuthError message={errorMessage} />
        </div>
      )}

      <div className="mt-6 space-y-4">
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
              if (fieldError) setFieldError("");
            }}
            autoComplete="email"
            className={`h-11 text-[14px] ${
              fieldError
                ? "border-destructive focus-visible:ring-destructive/20"
                : ""
            }`}
            aria-invalid={!!fieldError}
            aria-describedby={fieldError ? "email-error" : undefined}
          />
          {fieldError && (
            <p id="email-error" className="text-[12px] text-destructive" role="alert">
              {fieldError}
            </p>
          )}
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
            Sending link...
          </span>
        ) : (
          "Send reset link"
        )}
      </Button>

      <p className="text-center text-[13px] text-muted-foreground mt-6">
        Remember your password?{" "}
        <a
          href="/login"
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}
