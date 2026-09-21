import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { formatReviewDate } from "@/utils/formatter";
import RatingStars from "@/components/ui/RatingStars";

const ProductReviewCard = ({ review }) => {
    return (
        // Product review card
        <Card>
            <CardContent>
                {/* Reviewer information and review date */}
                <div className="flex items-start justify-between">
                    {/* Reviewer name and verification status */}
                    <div>
                        {/* Reviewer name */}
                        <h4 className="text-sm font-semibold">
                            {review.reviewer_name}
                        </h4>

                        {/* Show verified purchase status */}
                        {review.verified && (
                            <span className="text-success text-[10px]">
                                خرید تأییدشده
                            </span>
                        )}
                    </div>

                    {/* Review submission date */}
                    <span className="text-[10px] text-muted-foreground">
                        {formatReviewDate(review.created_at)}
                    </span>
                </div>

                {/* Review rating */}
                <RatingStars rating={review.rating} className="mt-3" />

                {/* Review content */}
                <p className="mt-3 text-sm text-foreground/65">{review.text}</p>
            </CardContent>
        </Card>
    );
};

ProductReviewCard.propTypes = {
    review: PropTypes.shape({
        reviewer_name: PropTypes.string.isRequired,
        verified: PropTypes.bool.isRequired,
        created_at: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductReviewCard;
