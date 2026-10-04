import { useState } from "react";

import PropTypes from "prop-types";
import { Minus, Plus, RotateCcw, Shield, Star, Truck } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useQuantityCounter } from "@/hooks/useQuantityCounter";
import { useCartActions } from "@/hooks/useCartActions";
import { formatPersianNumber } from "@/utils/formatter";
import { cn } from "cn";

import WishlistToggle from "./WishlistToggle";

const productInfo = [
    {
        value: "materials",
        title: "مواد و نگهداری",
        content:
            "پشم مرینو خالص با آستر ویسکوز. برای حفظ فرم لباس، خشکشویی تخصصی پیشنهاد می‌شود.",
    },
    {
        value: "shipping",
        title: "ارسال و بازگشت کالا",
        content:
            "ارسال رایگان برای سفارش‌های بالای ۱۰ میلیون تومان و امکان بازگشت تا ۳۰ روز.",
    },
    {
        value: "size-guide",
        title: "راهنمای سایز",
        content:
            "برای انتخاب دقیق، اندازه دور سینه و سرشانه خود را با جدول سایز مقایسه کنید.",
    },
];

const SIZE_ORDER = {
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
    XXXL: 7,
};

const ProductInfo = ({ product }) => {
    const { addCartItem } = useCartActions();

    // Get unique colors from the product variants
    const colors = product.product_variants
        ?.map((variant) => variant.color)
        .filter(Boolean)
        .filter(
            (color, index, self) =>
                index === self.findIndex((item) => item.id === color.id),
        );

    // Get unique sizes from the product variants
    const sizes = product.product_variants
        ?.map((variant) => variant.size)
        .filter(Boolean)
        .filter(
            (size, index, self) =>
                index === self.findIndex((item) => item === size),
        )
        .sort((a, b) => {
            const aIsNumber = !Number.isNaN(Number(a));
            const bIsNumber = !Number.isNaN(Number(b));

            if (aIsNumber && bIsNumber) return Number(a) - Number(b);

            if (!aIsNumber && !bIsNumber)
                return (
                    SIZE_ORDER[a.toUpperCase()] - SIZE_ORDER[b.toUpperCase()]
                );

            return aIsNumber ? -1 : 1;
        });

    // Calculate the discount percentage
    const discount =
        product.old_price > product.price
            ? Math.round(
                  ((product.old_price - product.price) / product.old_price) *
                      100,
              )
            : 0;

    // Track the selected product options and quantity
    const [selectedColor, setSelectedColor] = useState(colors?.[0]);
    const [selectedSize, setSelectedSize] = useState(null);

    // Find the variant matching the selected color and size
    const selectedVariant = product.product_variants.find(
        (v) => v.size === selectedSize && v.color_id === selectedColor.id,
    );

    // Get the available stock for the selected variant
    const stock = selectedVariant?.stock ?? 0;

    // Manage the selected quantity within the available stock
    const { quantity, increment, decrement, setQuantity } = useQuantityCounter({
        max: stock,
    });

    // Get all variants available for the selected color
    const variantsForColor = product.product_variants.filter(
        (v) => v.color_id === selectedColor.id,
    );

    // Check whether a specific size is available for the selected color
    const isSizeAvailable = (size) => {
        const variant = variantsForColor.find((v) => v.size === size);

        return Boolean(variant) && variant.stock > 0;
    };

    // Reset the size and quantity when the selected color changes
    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedSize(null);
        setQuantity(1);
    };

    // Add the selected variant and quantity to the cart
    const handleAddToCart = () => {
        addCartItem({
            variantId: selectedVariant.id,
            productId: product.id,
            quantity,
        });

        // Reset the quantity after adding the item
        setQuantity(1);
    };

    return (
        // Product information and purchase options
        <div>
            {/* Product title, brand, and rating */}
            <div>
                {/* Product brand */}
                <span className="font-semibold text-[10px] text-muted-foreground">
                    {product.brand.name_fa}
                </span>

                {/* Product name */}
                <h1 className="my-1.5 font-bold text-2xl lg:text-3xl line-clamp-2">
                    {product.name_fa}
                </h1>

                {/* English product name */}
                <span className="text-muted-foreground text-xs">
                    {product.name_en}
                </span>

                {/* Product rating and review count */}
                <div className="flex items-center gap-3 mt-3">
                    {/* Display five stars based on the average rating */}
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const isFilled =
                                star <= Math.round(product.avg_rating);

                            return (
                                <Star
                                    key={star}
                                    className={cn(
                                        "size-3",
                                        isFilled
                                            ? "text-yellow-500"
                                            : "text-muted-foreground",
                                    )}
                                    fill={isFilled ? "currentColor" : "none"}
                                />
                            );
                        })}
                    </div>

                    {/* Display the number of reviews */}
                    <span className="text-xs text-muted-foreground">
                        {product.review_count > 0
                            ? `${formatPersianNumber(product.review_count)} نظر`
                            : "بدون نظر"}
                    </span>
                </div>
            </div>

            {/* Product pricing and discount */}
            <div className="flex items-center gap-4 mt-6">
                {/* Current product price */}
                <p className="font-bold text-3xl">
                    {formatPersianNumber(product.price)}
                    <span className="text-xs font-normal">تومان</span>
                </p>

                {/* Original price and discount percentage */}
                {product.old_price && (
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground line-through">
                            {formatPersianNumber(product.old_price)}
                        </span>

                        <Badge className="bg-brand text-brand-foreground">
                            %{formatPersianNumber(discount)} تخفیف
                        </Badge>
                    </div>
                )}
            </div>

            {/* Color selection */}
            <div className="mt-6">
                {/* Selected color name */}
                <div className="flex items-center gap-1 text-sm mb-3">
                    <span className="font-medium">رنگ</span>-
                    <span className="text-muted-foreground">
                        {selectedColor.name_fa}
                    </span>
                </div>

                {/* Available color options */}
                <ToggleGroup
                    value={[selectedColor]}
                    onValueChange={(value) => {
                        // Keep the current color when the selection is cleared
                        if (value.length === 0) return;

                        handleColorChange(value[0]);
                    }}>
                    {colors.map((color) => (
                        <ToggleGroupItem
                            key={color.id}
                            value={color}
                            aria-label={color.name_fa}
                            className="size-9 rounded-full p-0 data-pressed:ring data-pressed:ring-primary">
                            {/* Color swatch */}
                            <span
                                className="size-8 rounded-full"
                                style={{ backgroundColor: color.hex_code }}
                            />
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            {/* Size selection */}
            <div className="mt-6">
                {/* Size label and size guide */}
                <div className="flex items-center justify-between gap-1 text-sm mb-3">
                    <span className="font-medium">سایز</span>
                    <span className="text-muted-foreground underline underline-offset-4">
                        راهنمای سایز
                    </span>
                </div>

                {/* Available size options */}
                <ToggleGroup
                    value={[selectedSize]}
                    onValueChange={(value) => setSelectedSize(value[0])}
                    className="mb-2">
                    {sizes.map((size) => {
                        const available = isSizeAvailable(size);

                        return (
                            <ToggleGroupItem
                                key={size}
                                value={size}
                                disabled={!available}
                                className="px-3 min-w-10 h-9 rounded-full border bg-white data-pressed:bg-primary data-pressed:text-primary-foreground">
                                {size}
                            </ToggleGroupItem>
                        );
                    })}
                </ToggleGroup>

                {/* Prompt the user to select a size */}
                {!selectedSize && (
                    <span className="text-[10px] text-muted-foreground">
                        لطفا یک سایز انتخاب کنید
                    </span>
                )}
            </div>

            {/* Product quantity selector */}
            <div className="flex items-center gap-4 mt-6">
                <span className="font-medium text-sm">تعداد</span>

                <div className="flex items-center overflow-hidden w-24 py-2 px-1 border rounded-full">
                    {/* Decrease quantity */}
                    <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="کاهش تعداد"
                        className="bg-transparent! border-none"
                        onClick={decrement}>
                        <Minus />
                    </Button>

                    {/* Current quantity */}
                    <span className="flex-1 text-center">
                        {formatPersianNumber(quantity)}
                    </span>

                    {/* Increase quantity */}
                    <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="افزایش تعداد"
                        className="bg-transparent! border-none"
                        disabled={!selectedVariant || stock === 0}
                        onClick={increment}>
                        <Plus />
                    </Button>
                </div>
            </div>

            {selectedVariant && (
                <div className="mt-2">
                    {stock === 0 ? (
                        <p className="text-xs text-red-500">ناموجود</p>
                    ) : stock <= 5 ? (
                        <p className="text-xs text-amber-500">
                            فقط {formatPersianNumber(stock)} عدد باقی مانده
                        </p>
                    ) : null}
                </div>
            )}

            {/* Add-to-cart and wishlist actions */}
            <div className="flex gap-3 mb-6 mt-4">
                {/* Add product to cart */}
                <Button
                    size="lg"
                    className="flex-1 h-13 rounded-xl"
                    disabled={!selectedVariant || stock === 0}
                    onClick={handleAddToCart}>
                    {selectedSize && stock === 0
                        ? "ناموجود"
                        : "افزودن به سبد خرید"}
                </Button>

                {/* Toggle product wishlist */}
                <WishlistToggle productId={product.id} />
            </div>

            {/* Shipping, returns, and authenticity information */}
            <div className="flex flex-wrap items-center gap-6 py-3 border-y">
                {/* Free shipping information */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Truck size={12} />
                    <span>
                        ارسال رایگان برای سفارش‌های بالای ۱۰ میلیون تومان
                    </span>
                </div>

                {/* Return policy */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <RotateCcw size={12} />
                    <span>۳۰ روز مهلت بازگشت</span>
                </div>

                {/* Product authenticity guarantee */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Shield size={12} />
                    <span>ضمانت اصالت کالا</span>
                </div>
            </div>

            {/* Additional product information */}
            <Accordion className="mt-6">
                {productInfo.map((item) => (
                    <AccordionItem key={item.value} value={item.value}>
                        {/* Accordion section title */}
                        <AccordionTrigger className="py-4">
                            <span className="text-start flex-1">
                                {item.title}
                            </span>
                        </AccordionTrigger>

                        {/* Accordion section content */}
                        <AccordionContent>{item.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

ProductInfo.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,

        brand: PropTypes.shape({
            name_fa: PropTypes.string.isRequired,
        }).isRequired,

        name_fa: PropTypes.string.isRequired,

        name_en: PropTypes.string.isRequired,

        price: PropTypes.number.isRequired,

        old_price: PropTypes.number,

        avg_rating: PropTypes.number.isRequired,

        review_count: PropTypes.number.isRequired,

        product_variants: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,

                color_id: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                ]).isRequired,

                color: PropTypes.shape({
                    id: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]).isRequired,

                    name_fa: PropTypes.string.isRequired,

                    hex_code: PropTypes.string.isRequired,
                }).isRequired,

                size: PropTypes.string,

                stock: PropTypes.number.isRequired,
            }),
        ).isRequired,

        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                rating: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default ProductInfo;
