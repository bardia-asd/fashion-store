import { Check, Star } from "lucide-react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "cn";

const TestimonialCard = ({ testimonial }) => {
    return (
        // Testimonial card containing the customer's review and details
        <Card className="cursor-pointer">
            <CardContent className="p-10 lg:p-14">
                {/* Display the testimonial rating */}
                <div className="flex items-center justify-center gap-2 mb-5">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= Math.round(testimonial.rating);

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

                {/* Customer testimonial text */}
                <blockquote className="font-medium text-lg lg:text-xl text-center">
                    "{testimonial.text}"
                </blockquote>

                {/* Customer information and verification status */}
                <div className="flex items-center gap-4 mt-8 justify-center">
                    {/* Customer avatar */}
                    <Avatar className="size-12">
                        <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                        />
                    </Avatar>

                    {/* Customer name and purchased product */}
                    <div className="flex flex-col">
                        {/* Customer name */}
                        <span className="font-semibold text-sm">
                            {testimonial.name}
                        </span>

                        {/* Product name and verification status */}
                        <div className="flex items-center gap-2">
                            {/* Purchased product */}
                            <span className="text-muted-foreground text-xs">
                                {testimonial.productName}
                            </span>

                            {/* Show verification status when available */}
                            {testimonial.is_verified && (
                                <span className="inline-flex items-center gap-1 text-success text-[10px]">
                                    <Check size={10} />
                                    تایید شده
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

TestimonialCard.propTypes = {
    testimonial: PropTypes.shape({
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        is_verified: PropTypes.bool.isRequired,
    }).isRequired,
};

export default TestimonialCard;
