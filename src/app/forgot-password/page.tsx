import type { Metadata } from "next";
import AuthLayout from "@/components/auth/auth-layout";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset Password — SVG Studio",
  description: "Reset your SVG Studio password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
