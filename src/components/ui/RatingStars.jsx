import PropTypes from "prop-types";
import { Star } from "lucide-react";
import { cn } from "cn";

const RatingStars = ({ rating, size = "size-2.5", className }) => {
    // Round the rating to determine how many stars should be filled
    const roundedRating = Math.round(rating);

    return (
        // Star rating display
        <div className={cn("flex items-center gap-1", className)}>
            {/* Render five stars based on the rating */}
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= roundedRating;

                return (
                    <Star
                        key={star}
                        className={cn(
                            size,
                            isFilled
                                ? "text-yellow-500"
                                : "text-muted-foreground",
                        )}
                        fill={isFilled ? "currentColor" : "none"}
                    />
                );
            })}
        </div>
    );
};

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
};

export default RatingStars;
