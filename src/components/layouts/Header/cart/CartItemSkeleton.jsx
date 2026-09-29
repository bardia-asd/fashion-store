import { Skeleton } from "@/components/ui/skeleton";

const CartItemSkeleton = () => {
    return (
        <div className="space-y-4 py-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex gap-4 py-2">
                    <Skeleton className="size-20 shrink-0" />

                    <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItemSkeleton;
