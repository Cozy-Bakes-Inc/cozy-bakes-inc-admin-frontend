interface ViewMarketLocationFieldProps {
  label: string;
  value?: string | string[];
  multiline?: boolean;
  link?: boolean;
  className?: string;
}

export function ViewMarketLocationField({
  label,
  value,
  multiline = false,
  link = false,
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
        {Array.isArray(value) ? (
          <div className="flex flex-wrap gap-2">
            {value.length > 0 ? (
              value.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
                >
                  {item}
                </span>
              ))
            ) : (
              <p className="w-full break-words text-sm font-medium leading-5 text-dark">
                -
              </p>
            )}
          </div>
        ) : link && value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full break-all text-sm font-medium leading-5 text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {value}
          </a>
        ) : (
          <p className="w-full break-words text-sm font-medium leading-5 text-dark">
            {value || "-"}
          </p>
        )}
      </div>
    </div>
  );
}
