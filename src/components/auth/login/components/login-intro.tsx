export function LoginIntro() {
  return (
    <div className="content-stretch flex flex-col gap-2 items-start w-full">
      <h1 className="text-dark text-[32px] font-bold tracking-[-0.64px]">
        Welcome Back to{" "}
        <span className="text-primary">Cozy Bakes Inc Admin.</span>
      </h1>
      <p className="text-gray-500 text-lg font-medium">
        Your management dashboard is ready. Sign in to oversee orders, track
        inventory, and manage your bakery’s operations with ease
      </p>
    </div>
  );
}
