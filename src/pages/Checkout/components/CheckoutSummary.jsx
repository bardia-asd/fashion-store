import { useSelector } from "react-redux";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { selectDeliveryMethod } from "@/features/checkout/checkoutSelectors";
import { useCart } from "@/hooks/useCart";
import { useCartLines } from "@/hooks/useCartLines";
import { formatPersianNumber } from "@/utils/formatter";

const shippingCost = 150_000;

const CheckoutSummary = () => {
    // Get the current cart items and loading state
    const { items, isLoading } = useCart();

    // Get cart lines with product details and calculate the subtotal
    const { lines, subTotal } = useCartLines(items);

    const deliveryMethod = useSelector(selectDeliveryMethod);

    const shippingCost = deliveryMethod === "standard" ? 50_000 : 90_000;

    // Calculate the final order total including shipping
    const total = subTotal + shippingCost;

    // Wait for the cart data before rendering the summary
    if (isLoading) {
        return (
            <aside>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3.5">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2.5">
                                <Skeleton className="w-14 h-16 shrink-0" />

                                <div className="flex-1 flex justify-between items-center">
                                    <div className="flex flex-col gap-2">
                                        <Skeleton className="h-3 w-28" />
                                        <Skeleton className="h-2.5 w-12" />
                                    </div>

                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                        ))}
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 border-t pt-4 bg-card">
                        <div className="w-full flex justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        <div className="w-full flex justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        <div className="w-full flex justify-between border-t pt-3">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-28" />
                        </div>
                    </CardFooter>
                </Card>
            </aside>
        );
    }

    return (
        // Checkout order summary
        <aside>
            <Card>
                <CardHeader>
                    {/* Order summary title */}
                    <CardTitle>خلاصه سفارش</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-3.5">
                    {/* Render each cart item */}
                    {lines.map((line) => (
                        <div
                            key={line.id}
                            className="flex items-center gap-2.5">
                            {/* Product thumbnail */}
                            <img
                                src={line.image}
                                alt={line.name}
                                width={56}
                                height={64}
                                className="w-14 h-16 object-cover shrink-0"
                            />

                            {/* Product information and line total */}
                            <div className="flex-1 flex justify-between items-center">
                                <div>
                                    {/* Product name */}
                                    <h5 className="text-xs font-semibold">
                                        {line.name}
                                    </h5>

                                    {/* Product quantity */}
                                    <span className="text-[10px] text-muted-foreground">
                                        {formatPersianNumber(line.quantity)}
                                        عدد
                                    </span>
                                </div>

                                {/* Total price for this product line */}
                                <span className="text-xs font-bold">
                                    {formatPersianNumber(line.lineTotal)}
                                </span>
                            </div>
                        </div>
                    ))}
                </CardContent>

                <CardFooter className="flex flex-col gap-3 border-t pt-4 bg-card">
                    {/* Order subtotal */}
                    <div className="w-full flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">جمع سفارش</span>
                        <span>{formatPersianNumber(subTotal)} تومان</span>
                    </div>

                    {/* Shipping cost */}
                    <div className="w-full flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            هزینه ارسال
                        </span>
                        <span>
                            {shippingCost === 0
                                ? "رایگان"
                                : `${formatPersianNumber(shippingCost)} تومان`}
                        </span>
                    </div>

                    {/* Final order total */}
                    <div className="w-full flex items-center justify-between border-t pt-3">
                        <span className="font-semibold">مبلغ نهایی</span>
                        <span className="text-base font-bold">
                            {formatPersianNumber(total)} تومان
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </aside>
    );
};

export default CheckoutSummary;
