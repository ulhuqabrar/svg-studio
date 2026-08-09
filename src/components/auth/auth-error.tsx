export default function AuthError({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-2.5 bg-destructive/[0.06] border border-destructive/15 rounded-xl text-[13px] text-destructive ${className}`}
      role="alert"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="w-4 h-4 flex-shrink-0"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
      </svg>
      {message}
    </div>
  );
}
