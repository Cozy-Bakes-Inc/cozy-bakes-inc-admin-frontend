"use client";

import SystemLoader from "@/components/ui/system-loader";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "./login-form";
import { LoginIntro } from "./components/login-intro";

function LoginContent() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo")?.trim() || "/";

  return (
    <section className="content-stretch flex flex-col gap-8 items-start justify-center py-2">
      <LoginIntro />
      <LoginForm returnTo={returnTo} />
    </section>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<SystemLoader />}>
      <LoginContent />
    </Suspense>
  );
}
