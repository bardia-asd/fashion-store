import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { Minus, Plus, Trash } from "lucide-react";
import PropTypes from "prop-types";

import { Button } from "@/components/ui/button";
import { removeItem, updateQuantity } from "@/features/cart/guestCartSlice";
import { formatPersianNumber } from "@/utils/formatter";

const CartItem = ({ line }) => {
    const dispatch = useDispatch();

    return (
        // Individual product row in the cart
        <div className="flex items-center gap-4 py-4">
            {/* Product image */}
            <div className="shrink-0 aspect-square w-20 rounded-2xl overflow-hidden">
                <Link to={`/products/${line.slug}`}>
                    <img
                        src={line.image}
                        alt={line.name}
                        loading="lazy"
                        className="size-full object-cover"
                    />
                </Link>
            </div>

            {/* Product information and actions */}
            <div className="flex-1 flex items-start justify-between gap-2">
                {/* Product details */}
                <div className="flex-1">
                    {/* Brand name */}
                    <span className="text-[10px] text-muted-foreground font-semibold tracking-wider">
                        {line.brand.name_fa}
                    </span>

                    {/* Product name */}
                    <Link
                        to={`/products/${line.slug}`}
                        className="mb-0.5 line-clamp-1">
                        {line.name}
                    </Link>

                    {/* Selected size and color */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            سایز: {line.size}
                        </span>

                        <span
                            className="inline-block size-3 rounded-full"
                            style={{
                                backgroundColor: line.color.hex_code,
                            }}
                        />
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
                                        variantId: line.variantId,
                                        quantity: line.quantity - 1,
                                    }),
                                )
                            }
                            className="bg-transparent! border-none">
                            {line.quantity > 1 ? <Minus /> : <Trash />}
                        </Button>

                        {/* Current quantity */}
                        <span className="flex-1 text-center">
                            {formatPersianNumber(line.quantity)}
                        </span>

                        {/* Increase quantity */}
                        <Button
                            variant="outline"
                            size="icon-xs"
                            aria-label="افزایش تعداد"
                            disabled={line.quantity === line.stock}
                            onClick={() =>
                                dispatch(
                                    updateQuantity({
                                        variantId: line.variantId,
                                        quantity: line.quantity + 1,
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
                        onClick={() => dispatch(removeItem(line.variantId))}
                        className="text-muted-foreground hover:text-destructive">
                        <Trash />
                    </Button>

                    {/* Product price */}
                    <p className="text-sm font-bold whitespace-nowrap">
                        {formatPersianNumber(line.lineTotal)}
                        <span className="font-normal text-xs mr-0.5">
                            تومان
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    line: PropTypes.shape({
        variantId: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
        lineTotal: PropTypes.number.isRequired,
        brand: PropTypes.shape({
            name_fa: PropTypes.string.isRequired,
        }).isRequired,
        color: PropTypes.shape({
            hex_code: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default CartItem;
