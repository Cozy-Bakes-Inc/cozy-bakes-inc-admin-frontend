import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib";

interface ProductDetailsImageProps {
  image?: string;
  title: string;
  className?: string;
}

export function ProductDetailsImage({
  image,
  title,
  className,
}: ProductDetailsImageProps) {
  return (
    <div className={cn("min-w-0 max-w-full", className)}>
      <p className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        Product Image
      </p>
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl border border-border/20 bg-white shadow-[0_14px_32px_rgba(61,44,30,0.05)] sm:h-[320px] lg:h-[calc(100%-32px)]">
        {image ? (
          <div className="relative size-full overflow-hidden rounded-xl bg-bg-creamy/55">
            <Image
              src={image}
              alt={`${title} image`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 420px, 100vw"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <ImageIcon className="size-8 text-primary" strokeWidth={2.1} />
            <p className="mt-2 text-sm font-medium text-dark">
              No image available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
