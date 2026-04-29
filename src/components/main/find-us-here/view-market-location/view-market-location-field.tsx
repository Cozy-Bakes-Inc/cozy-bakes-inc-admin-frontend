interface ViewMarketLocationFieldProps {
  label: string;
  value?: string;
  multiline?: boolean;
  className?: string;
}

export function ViewMarketLocationField({
  label,
  value,
  multiline = false,
  className = "",
}: ViewMarketLocationFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <p className="text-base font-medium leading-6 text-dark">{label}</p>
      <div
        className={`flex w-full rounded-[8px] border border-primary bg-[#fbf8eb14] p-3 ${
          multiline ? "min-h-[66px] items-start" : "min-h-[58px] items-center"
        }`}
      >
        <p className="w-full break-words text-sm font-medium leading-5 text-dark">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}
