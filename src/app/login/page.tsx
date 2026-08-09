import type { Metadata } from "next";
import AuthLayout from "@/components/auth/auth-layout";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In — SVG Studio",
  description: "Sign in to your SVG Studio account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
