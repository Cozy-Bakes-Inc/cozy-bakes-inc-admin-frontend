type VerifyOtpIntroProps = {
  email: string;
};

export function VerifyOtpIntro({ email }: VerifyOtpIntroProps) {
  return (
    <div className="content-stretch flex w-full flex-col items-start gap-2">
      <h1 className="text-dark text-[32px] font-bold tracking-[-0.64px]">
        Enter <span className="text-primary">verification code</span>
      </h1>
      <p className="text-lg font-medium text-gray-500">
        We&apos;ve sent a verification code to{" "}
        <span className="font-semibold text-dark">{email || "your email"}</span>
        . Please enter the code below to proceed.
      </p>
    </div>
  );
}
