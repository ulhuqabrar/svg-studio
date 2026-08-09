import type { Metadata } from "next";
import AuthLayout from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "Verify Email — SVG Studio",
  description: "Verify your SVG Studio email address.",
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="text-[22px] font-semibold text-foreground tracking-tight mb-1">
          Check your email
        </h1>
        <p className="text-[14px] text-muted-foreground mb-6 max-w-[320px] mx-auto">
          We sent a verification link to your email. Click the link to activate
          your account.
        </p>
        <div className="space-y-3">
          <p className="text-[13px] text-muted-foreground">
            Didn&apos;t receive the email?{" "}
            <button className="font-medium text-foreground hover:text-primary transition-colors">
              Resend verification
            </button>
          </p>
          <a
            href="/login"
            className="block text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to sign in
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}
