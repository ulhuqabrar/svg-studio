"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import PasswordField from "@/components/auth/password-field";
import AuthError from "@/components/auth/auth-error";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

function UpdatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  // Check if we have a valid recovery session
  useEffect(() => {
    supabase.auth.getSession().then((result: any) => {
      if (!result.data?.session) {
        // No session — the link may have expired or been used already
        router.replace("/login?error=invalid_recovery_link");
      }
    });
  }, [supabase, router]);

  function validate(): boolean {
    const errors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setState("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setState("error");
      setErrorMessage(error.message);
      return;
    }

    setState("success");
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
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
          Password updated!
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
          Set new password
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Choose a strong password for your account.
        </p>
      </div>

      {errorMessage && (
        <div className="mt-6 mb-4">
          <AuthError message={errorMessage} />
        </div>
      )}

      <div className="mt-6 space-y-4">
        <PasswordField
          id="password"
          label="New password"
          placeholder="Enter new password"
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

        <PasswordField
          id="confirmPassword"
          label="Confirm password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(val) => {
            setConfirmPassword(val);
            if (fieldErrors.confirmPassword) {
              setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
          }}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-[14px] font-medium mt-6"
        disabled={state === "loading"}
      >
        {state === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Updating password...
          </span>
        ) : (
          "Update password"
        )}
      </Button>
    </form>
  );
}

export default function UpdatePasswordPage() {
  return (
    <Suspense>
      <UpdatePasswordForm />
    </Suspense>
  );
}
