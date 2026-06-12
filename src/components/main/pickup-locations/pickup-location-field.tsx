"use client";

import type { ComponentType, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

type SharedFieldProps = {
  id: string;
  label: string;
  error?: string;
  icon?: ComponentType<{ className?: string }>;
};

type InputFieldProps = SharedFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextareaFieldProps = SharedFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

type PickupLocationFieldProps = InputFieldProps | TextareaFieldProps;

export function PickupLocationField(props: PickupLocationFieldProps) {
  const { id, label, error, icon: Icon, multiline, className, ...fieldProps } =
    props;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[16px] font-medium leading-6 text-dark"
      >
        {label}
      </label>
      <div
        className={cn(
          "flex min-h-[52px] items-start gap-3 rounded-[10px] border border-[#d0d5dd] bg-background px-4 py-3 transition-colors focus-within:border-primary/60",
          error && "border-danger",
          className,
        )}
      >
        {Icon ? (
          <Icon className="mt-1 size-4 shrink-0 text-primary" />
        ) : null}
        {multiline ? (
          <textarea
            id={id}
            className="min-h-[104px] w-full resize-none bg-transparent text-sm font-medium text-dark outline-none placeholder:text-gray disabled:cursor-not-allowed"
            {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            className="w-full bg-transparent text-sm font-medium text-dark outline-none placeholder:text-gray disabled:cursor-not-allowed"
            {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
      <InputErrorMessage msg={error} />
    </div>
  );
}
