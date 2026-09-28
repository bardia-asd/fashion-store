import { useDispatch } from "react-redux";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPersianNumber } from "@/utils/formatter";
import { removeItem, updateQuantity } from "@/features/cart/cartSlice";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        // Individual product row in the cart
        <div className="flex items-center gap-4 py-4">
            {/* Product image */}
            <div className="shrink-0 aspect-square w-20 rounded-2xl overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
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
                    <h3 className="mb-0.5 line-clamp-1">{item.name}</h3>

                    {/* Selected size and color */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            سایز: {item.size}
                        </span>

                        <span
                            className="inline-block size-3 rounded-full"
                            style={{
                                backgroundColor: item.color.hex_code,
                            }}></span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center overflow-hidden w-20 border rounded-full mt-2.5">
                        {/* Decrease quantity */}
                        <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="کاهش تعداد"
                            onClick={() =>
                                dispatch(
                                    updateQuantity({
                                        id: item.id,
                                        change: -1,
                                    }),
                                )
                            }
                            className="bg-transparent! border-none">
                            {item.quantity > 1 ? <Minus /> : <Trash />}
                        </Button>

                        {/* Current quantity */}
                        <span className="flex-1 text-center">
                            {formatPersianNumber(item.quantity)}
                        </span>

                        {/* Increase quantity */}
                        <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="افزایش تعداد"
                            onClick={() =>
                                dispatch(
                                    updateQuantity({
                                        id: item.id,
                                        change: 1,
                                    }),
                                )
                            }
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
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-muted-foreground hover:text-destructive">
                        <Trash />
                    </Button>

                    {/* Product price */}
                    <p className="text-sm font-bold whitespace-nowrap">
                        {formatPersianNumber(item.price * item.quantity)}
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
