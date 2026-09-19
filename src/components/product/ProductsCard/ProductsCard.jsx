import PropTypes from "prop-types";
import { Link } from "react-router";
import { Star } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

import { getTagStyle } from "../utils/getTagColor";
import { formatPersianNumber } from "@/utils/formatter";
import { cn } from "cn";

const ProductsCard = ({ product }) => {
    // Get the product thumbnail image
    const thumbnail = product.product_images?.find((img) => img.is_thumbnail);

    // Get unique colors from the product variants
    const colors = product.product_variants
        ?.map((variant) => variant.color)
        .filter(Boolean)
        .filter(
            (color, index, self) =>
                index === self.findIndex((item) => item.id === color.id),
        );

    // Calculate the total number of reviews
    const reviewCount = product.reviews?.length;

    // Calculate the average product rating
    const rating =
        reviewCount > 0
            ? product.reviews.reduce((sum, review) => sum + review.rating, 0)
            : 0;

    return (
        // Product card linking to the product details page
        <article className="group h-full">
            <Link
                to={`/products/${product.slug}`}
                className="flex h-full flex-col">
                {/* Product image and optional tag */}
                <div className="relative overflow-hidden rounded-xl">
                    <AspectRatio ratio={3 / 4}>
                        <img
                            src={thumbnail.url}
                            alt=""
                            className="size-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                    </AspectRatio>

                    {/* Display the product tag when available */}
                    {product.tag && (
                        <Badge
                            className={cn(
                                "absolute top-3 right-3",
                                getTagStyle(product.tag),
                            )}>
                            {product.tag}
                        </Badge>
                    )}
                </div>

                {/* Product information */}
                <div className="mt-3 flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                        {/* Brand and product name */}
                        <div>
                            <span className="font-semibold text-[10px] text-muted-foreground">
                                {product.brand.name_fa}
                            </span>

                            <h3 className="line-clamp-2 text-sm font-medium">
                                {product.name_fa}
                            </h3>
                        </div>

                        {/* Current and original prices */}
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-semibold">
                                    {formatPersianNumber(product.price)}
                                </span>
                                <span className="text-xs">تومان</span>
                            </div>

                            {/* Show the original price when the product is discounted */}
                            {product.old_price && (
                                <span className="text-xs text-muted-foreground line-through">
                                    {formatPersianNumber(product.old_price)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Rating and available colors */}
                    <div className="mt-auto pt-1.5">
                        {/* Display five stars based on the average rating */}
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const isFilled = star <= Math.round(rating);

                                return (
                                    <Star
                                        key={star}
                                        className={cn(
                                            "size-3",
                                            isFilled
                                                ? "text-yellow-500"
                                                : "text-muted-foreground",
                                        )}
                                        fill={
                                            isFilled ? "currentColor" : "none"
                                        }
                                    />
                                );
                            })}
                        </div>

                        {/* Display the unique available product colors */}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {colors.map((color) => (
                                <span
                                    key={color.id}
                                    className="inline-block size-3.5 rounded-full"
                                    style={{
                                        backgroundColor: color.hex_code,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
};

ProductsCard.propTypes = {
    product: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name_fa: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        old_price: PropTypes.number,
        tag: PropTypes.string,
        product_images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                is_thumbnail: PropTypes.bool.isRequired,
            }),
        ).isRequired,
        product_variants: PropTypes.arrayOf(
            PropTypes.shape({
                color: PropTypes.shape({
                    id: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]).isRequired,
                    hex_code: PropTypes.string.isRequired,
                }),
            }),
        ).isRequired,
        brand: PropTypes.shape({
            name_fa: PropTypes.string.isRequired,
        }).isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                rating: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
};

export default ProductsCard;
