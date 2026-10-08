import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { selectPaymentMethod } from "@/features/checkout/checkoutSelectors";
import { setPaymentMethod } from "@/features/checkout/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PaymentStep = () => {
    // Get Redux dispatch and checkout navigation helpers
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the currently selected payment method
    const paymentMethod = useSelector(selectPaymentMethod);

    // Validate the payment method before continuing to the review step
    const handleContinue = () => {
        // Prevent continuing without selecting a payment method
        if (!paymentMethod) return;

        navigate("/checkout/review");
    };

    return (
        // Payment method selection card
        <Card>
            <CardHeader>
                {/* Payment section title */}
                <CardTitle>روش پرداخت</CardTitle>
            </CardHeader>

            <CardContent>
                {/* Allow the user to select one payment method */}
                <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => dispatch(setPaymentMethod(value))}
                    className="flex flex-col gap-3">
                    {/* Online payment option */}
                    <Label
                        htmlFor="online"
                        className="flex cursor-pointer items-center justify-between rounded-xs border p-4">
                        <div className="flex items-center gap-3">
                            {/* Select online payment */}
                            <RadioGroupItem value="online" id="online" />

                            <div className="flex flex-col gap-1">
                                {/* Payment method name */}
                                <span className="font-medium">
                                    پرداخت آنلاین
                                </span>

                                {/* Payment method description */}
                                <span className="text-sm text-muted-foreground">
                                    پرداخت امن با کارت بانکی
                                </span>
                            </div>
                        </div>
                    </Label>
                </RadioGroup>
            </CardContent>

            <CardFooter className="flex items-center gap-1.5 border-t bg-card pt-4">
                {/* Return to the delivery step */}
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/checkout/delivery")}>
                    بازگشت
                </Button>

                {/* Continue to the order review step */}
                <Button type="button" size="lg" onClick={handleContinue}>
                    ادامه
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PaymentStep;
