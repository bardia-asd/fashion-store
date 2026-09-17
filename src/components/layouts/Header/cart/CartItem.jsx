import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPersianNumber } from "@/utils/formatter";

const CartItem = () => {
    return (
        // Individual product row in the cart
        <div className="flex items-center gap-4 py-4">
            {/* Product image */}
            <div className="shrink-0 aspect-square w-20 rounded-2xl overflow-hidden">
                <img
                    src="https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    loading="lazy"
                    className="size-full object-cover"
                />
            </div>

            {/* Product information and actions */}
            <div className="flex-1 flex items-start justify-between gap-2">
                {/* Product details */}
                <div className="flex-1">
                    {/* Brand name */}
                    <span className="text-[10px] text-muted-foreground font-semibold tracking-wider">
                        DBY
                    </span>

                    {/* Product name */}
                    <h3 className="mb-0.5 line-clamp-1">هودی کتان مینیمال</h3>

                    {/* Selected size and color */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            سایز: M
                        </span>

                        <span className="inline-block size-3 rounded-full bg-black"></span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center overflow-hidden w-20 border rounded-full mt-2.5">
                        {/* Decrease quantity */}
                        <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="کاهش تعداد"
                            className="bg-transparent! border-none">
                            <Minus />
                        </Button>

                        {/* Current quantity */}
                        <span className="flex-1 text-center">
                            {formatPersianNumber(2)}
                        </span>

                        {/* Increase quantity */}
                        <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="افزایش تعداد"
                            className="bg-transparent! border-none">
                            <Plus />
                        </Button>
                    </div>
                </div>

                {/* Remove action and product price */}
                <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                    {/* Remove product from cart */}
                    <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="حذف از سبد خرید"
                        className="text-muted-foreground hover:text-destructive">
                        <Trash />
                    </Button>

                    {/* Product price */}
                    <p className="text-sm font-bold whitespace-nowrap">
                        {formatPersianNumber(120000)}
                        <span className="font-normal text-xs mr-0.5">
                            تومان
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
