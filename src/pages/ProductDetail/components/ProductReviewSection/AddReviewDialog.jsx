import { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { selectAuthUser } from "@/features/auth/authSelectors";
import { useAddReviewMutation } from "@/features/reviews/reviewsApi";
import { reviewSchema } from "@/utils/validation";
import { cn } from "cn";

const AddReviewDialog = ({ productId }) => {
    // Control whether the review dialog is open
    const [open, setOpen] = useState(false);

    // Get the currently authenticated user
    const user = useSelector(selectAuthUser);

    // Get navigation and current location helpers
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize the review form with Zod validation
    const { reset, control, handleSubmit } = useForm({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            comment: "",
            anonymous: false,
        },
    });

    // Mutation for submitting a new product review
    const [addReview, { isLoading }] = useAddReviewMutation();

    // Submit the validated review data
    const onSubmit = async (data) => {
        try {
            await addReview({
                productId,
                userId: user.id,
                name: data.anonymous
                    ? "ناشناس"
                    : user.user_metadata?.name || "کاربر",
                comment: data.comment.trim(),
                rating: data.rating,
            }).unwrap();

            // Reset the form and close the dialog after a successful submission
            reset();
            handleOpenChange(false);
        } catch (error) {
            // Show a specific message when the user has already reviewed the product
            toast.error(
                error?.code === "23505"
                    ? "شما قبلاً برای این محصول نظر ثبت کرده‌اید."
                    : "ثبت نظر با خطا مواجه شد. دوباره تلاش کنید.",
            );
        }
    };

    // Handle dialog open and close behavior
    const handleOpenChange = (next) => {
        // Redirect unauthenticated users to the login page
        if (next && !user) {
            toast.info("برای ثبت نظر ابتدا وارد حساب کاربری خود شوید.");

            navigate("/signin", {
                state: {
                    from: location.pathname + location.search,
                },
            });

            return;
        }

        // Reset the form when the dialog is closed
        if (!next) {
            reset();
        }

        setOpen(next);
    };

    return (
        // Review dialog
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {/* Button that opens the review dialog */}
            <DialogTrigger
                render={
                    <Button variant="outline" size="sm">
                        ثبت نظر
                    </Button>
                }
            />

            {/* Review form dialog */}
            <DialogContent className="sm:max-w-md" showCloseButton={false}>
                <DialogHeader className="text-right">
                    {/* Dialog title */}
                    <DialogTitle>ثبت نظر</DialogTitle>

                    {/* Dialog description */}
                    <DialogDescription>
                        تجربه خود را از این محصول با دیگران به اشتراک بگذارید.
                    </DialogDescription>
                </DialogHeader>

                {/* Review form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Rating field */}
                        <Controller
                            name="rating"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label>امتیاز شما</Label>

                                    {/* Interactive star rating */}
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <button
                                                key={value}
                                                type="button"
                                                aria-label={`${value} از ۵`}
                                                onClick={() =>
                                                    field.onChange(value)
                                                }
                                                className="rounded p-0.5 outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                                <Star
                                                    className={cn(
                                                        "size-4 transition-colors",
                                                        value <= field.value
                                                            ? "fill-yellow-500 text-yellow-500"
                                                            : "text-muted-foreground/40",
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Display rating validation error */}
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Comment field */}
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label htmlFor="review-comment">
                                        متن دیدگاه
                                    </Label>

                                    <Textarea
                                        {...field}
                                        id="review-comment"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید.."
                                        className="resize-none h-24 overflow-y-auto scrollbar-thin"
                                    />

                                    {/* Display comment validation error */}
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Anonymous review option */}
                        <Controller
                            name="anonymous"
                            control={control}
                            render={({ field }) => (
                                <Field orientation="horizontal">
                                    <Checkbox
                                        id="review-anonymous"
                                        checked={field.value}
                                        onCheckedChange={(c) =>
                                            field.onChange(c === true)
                                        }
                                        className="cursor-pointer"
                                    />

                                    <Label
                                        htmlFor="review-anonymous"
                                        className="cursor-pointer">
                                        نظر من به صورت ناشناس نمایش داده شود
                                    </Label>
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    {/* Review form actions */}
                    <div className="mt-5 pt-3 flex flex-col sm:flex-row gap-2 border-t">
                        {/* Submit review */}
                        <Button type="submit" size="lg" disabled={isLoading}>
                            {isLoading ? "در حال ثبت..." : "ثبت نظر"}
                        </Button>

                        {/* Cancel and close the dialog */}
                        <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}>
                            انصراف
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

AddReviewDialog.propTypes = {
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default AddReviewDialog;
