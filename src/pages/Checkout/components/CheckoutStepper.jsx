import { useLocation, useNavigate } from "react-router";
import { Check } from "lucide-react";
import { formatPersianNumber } from "@/utils/formatter";
import { cn } from "cn";

const CHECKOUT_STEPS = [
    { key: "shipping", label: "اطلاعات ارسال" },
    { key: "delivery", label: "روش ارسال" },
    { key: "payment", label: "پرداخت" },
    { key: "review", label: "بررسی نهایی" },
];

const CheckoutStepper = () => {
    // Get the current checkout route and navigation helper
    const location = useLocation();
    const navigate = useNavigate();

    // Get the current checkout step from the URL
    const currentStep = location.pathname.split("/").pop();

    // Find the index of the current checkout step
    const currentIndex = CHECKOUT_STEPS.findIndex(
        (step) => step.key === currentStep,
    );

    return (
        // Checkout progress navigation
        <nav aria-label="مراحل پرداخت">
            <ol className="flex items-center justify-center mx-auto mb-10 max-w-4xl">
                {CHECKOUT_STEPS.map((step, i) => {
                    // Determine the state of the current step
                    const isCurrent = step.key === currentStep;
                    const isCompleted = i < currentIndex;
                    const isClickable = i < currentIndex;

                    return (
                        <li
                            key={step.key}
                            className="flex items-start not-last:flex-1">
                            {/* Step button for completed steps */}
                            <button
                                type="button"
                                disabled={!isClickable}
                                className={cn(
                                    "flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-[10px] sm:text-xs",
                                    isCurrent || isCompleted
                                        ? "text-foreground"
                                        : "text-muted-foreground",
                                )}
                                aria-current={isCurrent ? "step" : undefined}
                                onClick={() =>
                                    navigate(`/checkout/${step.key}`)
                                }>
                                {/* Step number or completion icon */}
                                <span
                                    className={cn(
                                        "shrink-0 inline-flex items-center justify-center size-8 rounded-full",
                                        isCurrent || isCompleted
                                            ? "border-2 border-brand text-brand"
                                            : "border",
                                    )}>
                                    {isCompleted ? (
                                        <Check size={16} />
                                    ) : (
                                        formatPersianNumber(i + 1)
                                    )}
                                </span>

                                {/* Step label */}
                                <span
                                    className={cn(
                                        "font-medium whitespace-nowrap",
                                        isCurrent && "text-brand",
                                    )}>
                                    {step.label}
                                </span>
                            </button>

                            {/* Connector between checkout steps */}
                            {i < CHECKOUT_STEPS.length - 1 && (
                                <div
                                    className={cn(
                                        "flex-1 h-px mx-2 sm:mx-4 mt-4",
                                        isCompleted ? "bg-brand" : "bg-border",
                                    )}
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default CheckoutStepper;
