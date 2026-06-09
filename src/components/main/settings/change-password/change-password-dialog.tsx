"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "@/components/ui/modal";
import { ChangePasswordEmailStep } from "./change-password-email-step";
import { ChangePasswordOtpStep } from "./change-password-otp-step";
import { ChangePasswordPasswordStep } from "./change-password-password-step";

type Step = "email" | "otp" | "password";

const RESEND_DURATION = 300;

const STEP_TITLES: Record<Step, string> = {
  email: "Change Password",
  otp: "Verify Your Email",
  password: "Set New Password",
};

const STEP_DESCRIPTIONS: Record<Step, string> = {
  email: "Enter your registered email to receive a verification code.",
  otp: "Enter the 5-digit code we sent to your email.",
  password: "Choose a strong new password for your account.",
};

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ChangePasswordDialog({ open, onClose }: ChangePasswordDialogProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    setSecondsLeft(RESEND_DURATION);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function handleEmailSuccess(sentEmail: string) {
    setEmail(sentEmail);
    setStep("otp");
    startTimer();
  }

  function handleOtpSuccess(verifiedOtp: string) {
    setOtp(verifiedOtp);
    setStep("password");
  }

  function handleOtpExpired() {
    setOtp("");
    setStep("otp");
    startTimer();
  }

  function handleClose() {
    if (timerRef.current) clearInterval(timerRef.current);
    onClose();
  }

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("email");
        setEmail("");
        setOtp("");
        setSecondsLeft(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={STEP_TITLES[step]}
      description={STEP_DESCRIPTIONS[step]}
      contentClassName="sm:max-w-md"
    >
      {step === "email" && (
        <ChangePasswordEmailStep onSuccess={handleEmailSuccess} />
      )}
      {step === "otp" && (
        <ChangePasswordOtpStep
          email={email}
          secondsLeft={secondsLeft}
          onSuccess={handleOtpSuccess}
          onBack={() => setStep("email")}
          onResend={startTimer}
        />
      )}
      {step === "password" && (
        <ChangePasswordPasswordStep
          email={email}
          otp={otp}
          onSuccess={handleClose}
          onBack={() => setStep("otp")}
          onOtpExpired={handleOtpExpired}
        />
      )}
    </Modal>
  );
}
