import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
    return (
        <article className="h-full">
            <div className="flex h-full flex-col">
                {/* Product image */}
                <div className="overflow-hidden rounded-xl">
                    <AspectRatio ratio={4 / 5}>
                        <Skeleton className="size-full" />
                    </AspectRatio>
                </div>

                {/* Product information */}
                <div className="mt-3 flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                        {/* Brand and product name */}
                        <div className="min-w-0 flex-1">
                            <Skeleton className="mb-1.5 h-2.5 w-12" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="mt-1 h-4 w-24" />
                        </div>

                        {/* Price */}
                        <div className="flex shrink-0 flex-col items-end gap-1">
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-3 w-8" />
                            </div>

                            <Skeleton className="h-3 w-14" />
                        </div>
                    </div>

                    {/* Rating and colors */}
                    <div className="mt-auto pt-1.5">
                        {/* Stars */}
                        <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton key={index} className="size-3" />
                            ))}
                        </div>

                        {/* Colors */}
                        <div className="mt-2 flex gap-1.5">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="size-3.5 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProductCardSkeleton;
