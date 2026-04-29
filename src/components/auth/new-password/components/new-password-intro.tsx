export function NewPasswordIntro() {
  return (
    <div className="content-stretch flex w-full flex-col items-start gap-2">
      <h1 className="text-dark text-[32px] font-bold tracking-[-0.64px]">
        Create a <span className="text-primary">new password</span>
      </h1>
      <p className="text-lg font-medium text-gray-500">
        Enter a new password for your account and make sure to keep it
        safe.choose a strong password with uppercase, lowercase, numbers, and
        symbols.
      </p>
    </div>
  );
}
