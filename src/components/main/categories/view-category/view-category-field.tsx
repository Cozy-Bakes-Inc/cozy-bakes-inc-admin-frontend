interface ViewCategoryFieldProps {
  label: string;
  value: string;
  multiline?: boolean;
}

export function ViewCategoryField({
  label,
  value,
  multiline = false,
}: ViewCategoryFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-base font-medium text-dark">{label}</p>
      <div
        className={
          multiline
            ? "min-h-[74px] rounded-[6px] border border-primary bg-background px-3 py-2.5"
            : "flex min-h-[38px] items-center rounded-[6px] border border-primary bg-background px-3 py-2"
        }
      >
        <p
          className={
            multiline
              ? "text-base font-medium leading-4 text-dark"
              : "truncate text-base font-medium text-dark"
          }
        >
          {value}
        </p>
      </div>
    </div>
  );
}
