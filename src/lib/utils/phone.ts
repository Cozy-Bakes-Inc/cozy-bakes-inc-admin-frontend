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
  const rawDigits = value.replace(/\D/g, "");
  const digits =
    rawDigits.startsWith("1") && rawDigits.length > 10
      ? rawDigits.slice(1, 11)
      : rawDigits.slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6)
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function stripPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function getUSPhoneLocalDigits(phone: string): string {
  const digits = stripPhoneDigits(phone);
  return digits.startsWith("1") && digits.length === 11
    ? digits.slice(1)
    : digits;
}

export function isValidUSPhoneNumber(phone: string): boolean {
  const local = getUSPhoneLocalDigits(phone);

  return (
    local.length === 10 &&
    /^[2-9]\d{2}[2-9]\d{6}$/.test(local)
  );
}

export function normalizePhoneForBackend(phone: string): string {
  return formatPhoneInput(phone);
}
