import PropTypes from "prop-types";
import { formatPersianNumber } from "@/utils/formatter";
import ProductReviewCard from "./ProductReviewCard";
import RatingStars from "@/components/ui/RatingStars";

const ProductReviewSection = ({ reviews }) => {
    // Calculate the total number of reviews
    const reviewCount = reviews.length;

    // Calculate the average review rating
    const rating =
        reviewCount > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviewCount
            : 0;

    return (
        // Product reviews section
        <section className="mt-10 lg:mt-16 pt-9 border-t">
            {/* Section heading and overall rating */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
                {/* Review section title */}
                <div>
                    {/* Section label */}
                    <span className="font-semibold text-[10px] text-muted-foreground">
                        بازخورد مشتریان
                    </span>

                    {/* Main section title */}
                    <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mt-3">
                        نظر مشتریان درباره این محصول
                    </h2>
                </div>

                {/* Overall product rating */}
                <div className="flex items-center gap-2">
                    {/* Average rating */}
                    <p className="font-semibold text-2xl">
                        {reviewCount > 0 ? formatPersianNumber(rating) : "—"}
                    </p>

                    {/* Average rating stars */}
                    <RatingStars
                        rating={reviewCount > 0 ? rating : 0}
                        size="size-3"
                    />

                    {/* Review count */}
                    <span className="text-xs text-muted-foreground">
                        {reviewCount > 0
                            ? `${formatPersianNumber(reviewCount)} نظر`
                            : "بدون نظر"}
                    </span>
                </div>
            </div>

            {/* Review cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {reviewCount > 0 ? (
                    // Render each product review
                    reviews.map((review) => (
                        <ProductReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    // Empty state when the product has no reviews
                    <div className="col-span-full py-4 text-center">
                        {/* Empty state title */}
                        <p className="text-sm font-medium">
                            هنوز نظری ثبت نشده است
                        </p>

                        {/* Empty state description */}
                        <p className="mt-1 text-sm text-muted-foreground">
                            اولین نفری باشید که درباره این محصول نظر می‌دهد.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

ProductReviewSection.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            reviewer_name: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            verified: PropTypes.bool.isRequired,
            created_at: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default ProductReviewSection;
