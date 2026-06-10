export function formatPhoneDisplay(phone: string | null | undefined): string {
  if (!phone) return "N/A";
  const digits = phone.replace(/\D/g, "");
  const local =
    digits.startsWith("1") && digits.length === 11 ? digits.slice(1) : digits;
  if (local.length === 10) {
    return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
  }
  return phone.trim();
}

export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6)
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function stripPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}
