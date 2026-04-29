"use client";

import SystemLoader from "@/components/ui/system-loader";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { NewPasswordIntro } from "./components/new-password-intro";
import { NewPasswordForm } from "./new-password-form";

function NewPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email")?.trim() || "";

  return (
    <section className="content-stretch flex flex-col items-start justify-center gap-8 py-2">
      <NewPasswordIntro />
      <NewPasswordForm email={email} />
    </section>
  );
}

export default function NewPassword() {
  return (
    <Suspense fallback={<SystemLoader />}>
      <NewPasswordContent />
    </Suspense>
  );
}
