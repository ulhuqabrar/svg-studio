import type { Metadata } from "next";
import AuthLayout from "@/components/auth/auth-layout";
import SignupForm from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up — SVG Studio",
  description: "Create your SVG Studio account and start generating SVGs.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
