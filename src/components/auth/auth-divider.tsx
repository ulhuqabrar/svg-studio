export default function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-[12px]">
        <span className="bg-card px-3 text-muted-foreground uppercase tracking-wider font-medium">
          or continue with email
        </span>
      </div>
    </div>
  );
}
