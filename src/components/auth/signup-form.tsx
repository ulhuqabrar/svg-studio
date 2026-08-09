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

type SignupState =
  | "idle"
  | "loading"
  | "google-loading"
  | "error"
  | "success";

export default function SignupForm() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<SignupState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  function getPasswordStrength(pw: string): {
    label: string;
    color: string;
    width: string;
  } {
    if (pw.length === 0) return { label: "", color: "bg-muted", width: "0%" };
    if (pw.length < 6)
      return { label: "Weak", color: "bg-destructive", width: "33%" };
    if (pw.length < 10)
      return { label: "Fair", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-primary", width: "100%" };
  }

  const passwordStrength = getPasswordStrength(password);

  function validate(): boolean {
    const errors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setState("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name.trim(),
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setState("error");
      if (error.message.includes("already registered")) {
        setErrorMessage("An account with this email already exists.");
      } else if (error.message.includes("valid email")) {
        setErrorMessage("Please enter a valid email address.");
      } else {
        setErrorMessage(error.message);
      }
      return;
    }

    setState("success");
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
  }

  if (state === "success") {
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
        <p className="text-[14px] text-muted-foreground mb-4">
          We sent a verification link to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
        <Button
          variant="outline"
          className="h-10 text-[13px]"
          onClick={() => {
            setState("idle");
            setName("");
            setEmail("");
            setPassword("");
          }}
        >
          Back to sign up
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-1 mb-1">
        <h1 className="text-[22px] font-semibold text-foreground tracking-tight">
          Create your account
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Start creating SVGs that match your style.
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
          <Label htmlFor="name" className="text-[13px] font-medium text-foreground">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) {
                setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            autoComplete="name"
            className={`h-11 text-[14px] ${
              fieldErrors.name
                ? "border-destructive focus-visible:ring-destructive/20"
                : ""
            }`}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name && (
            <p id="name-error" className="text-[12px] text-destructive" role="alert">
              {fieldErrors.name}
            </p>
          )}
        </div>

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

        <div className="space-y-1.5">
          <PasswordField
            id="password"
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(val) => {
              setPassword(val);
              if (fieldErrors.password) {
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            error={fieldErrors.password}
            autoComplete="new-password"
          />
          {password.length > 0 && (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: passwordStrength.width }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground">
                {passwordStrength.label}
              </span>
            </div>
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
            Creating account...
          </span>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-center text-[13px] text-muted-foreground mt-6">
        Already have an account?{" "}
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
