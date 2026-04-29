"use client";

import { ForgotPasswordIntro } from "./components/forgot-password-intro";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPassword() {
  return (
    <section className="content-stretch flex flex-col items-start justify-center gap-8 py-2">
      <ForgotPasswordIntro />
      <ForgotPasswordForm />
    </section>
  );
}
