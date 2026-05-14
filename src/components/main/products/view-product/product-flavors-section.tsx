interface ProductFlavorsSectionProps {
  flavors: string[];
}

export function ProductFlavorsSection({ flavors }: ProductFlavorsSectionProps) {
  return (
    <section className="min-w-0 max-w-full">
      <h3 className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        Flavors
      </h3>

      <div className="min-w-0 max-w-full rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3 md:p-4">
        {flavors.length === 0 ? (
          <p className="min-w-0 max-w-full break-words text-sm font-medium text-muted-text [overflow-wrap:anywhere]">
            No flavors available
          </p>
        ) : (
          <div className="flex min-w-0 max-w-full flex-wrap gap-2">
            {flavors.map((flavor) => (
              <span
                key={flavor}
                className="min-w-0 max-w-full break-words rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-sm font-medium text-primary [overflow-wrap:anywhere]"
              >
                {flavor}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
