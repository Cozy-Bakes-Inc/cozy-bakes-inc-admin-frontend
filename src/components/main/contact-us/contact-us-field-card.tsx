import type { ContactUsFieldCardProps } from "@/interfaces/main/contact-us";

export function ContactUsFieldCard({ field }: ContactUsFieldCardProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={field.id}
        className="block text-base font-medium leading-6 text-dark"
      >
        {field.label}
      </label>
      {field.multiline ? (
        <textarea
          id={field.id}
          value={field.value}
          readOnly
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="min-h-[94px] w-full rounded-lg border border-primary bg-[#fbf8eb14] px-3 py-3 text-base leading-6 text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70"
        />
      ) : (
        <input
          id={field.id}
          value={field.value}
          readOnly
          placeholder={`Enter ${field.label.toLowerCase()}`}
          className="min-h-[58px] w-full rounded-lg border border-primary bg-[#fbf8eb14] px-3 py-2.5 text-sm leading-5 font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70"
        />
      )}
    </div>
  );
}
