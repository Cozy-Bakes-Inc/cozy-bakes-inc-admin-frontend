interface ProductTextSectionProps {
  title: string;
  value?: string | null;
  fallback: string;
}

export function ProductTextSection({
  title,
  value,
  fallback,
}: ProductTextSectionProps) {
  const displayValue = value?.trim() ? value : fallback;

  return (
    <section className="min-w-0 max-w-full">
      <h3 className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        {title}
      </h3>
      <div className="min-h-[82px] min-w-0 max-w-full break-words whitespace-pre-wrap rounded-[8px] border border-[#D0D5DD] bg-background px-4 py-3 text-base font-medium leading-7 text-dark [overflow-wrap:anywhere]">
        {displayValue}
      </div>
    </section>
  );
}
