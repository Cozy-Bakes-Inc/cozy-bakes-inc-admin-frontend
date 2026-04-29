export function ForgotPasswordIntro() {
  return (
    <div className="content-stretch flex w-full flex-col items-start gap-2">
      <h1 className="text-dark text-[32px] font-bold tracking-[-0.64px]">
        Forgot your <span className="text-primary">password?</span>
      </h1>
      <p className="text-lg font-medium text-gray-500">
        Don&apos;t worry! Enter your registered email address, and we&apos;ll
        send you a otp code to reset your password.
      </p>
    </div>
  );
}
