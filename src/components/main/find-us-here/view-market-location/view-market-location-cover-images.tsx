import Image from "next/image";

interface ViewMarketLocationCoverImagesProps {
  images?: string[];
  marketName?: string;
}

export function ViewMarketLocationCoverImages({
  images = [],
  marketName = "Market",
}: ViewMarketLocationCoverImagesProps) {
  return (
    <div className="space-y-2">
      <p className="text-base font-medium leading-6 text-dark">Cover Image</p>
      {images.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="size-[150px] overflow-hidden rounded-[24px] border border-dashed border-primary bg-[#fbf8eb14]"
            >
              <Image
                src={image}
                alt={`${marketName} cover ${index + 1}`}
                width={150}
                height={150}
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[120px] items-center justify-center rounded-[24px] border border-dashed border-primary bg-[#fbf8eb14] px-4 text-center text-sm font-medium text-muted-text">
          No cover images available
        </div>
      )}
    </div>
  );
}
