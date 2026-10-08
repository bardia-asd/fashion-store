import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

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
import { selectDeliveryMethod } from "@/features/checkout/checkoutSelectors";
import { setDeliveryMethod } from "@/features/checkout/checkoutSlice";

const DeliveryStep = () => {
    // Get Redux dispatch and checkout navigation helpers
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the currently selected delivery method
    const deliveryMethod = useSelector(selectDeliveryMethod);

    return (
        // Delivery method selection card
        <Card>
            <CardHeader>
                {/* Delivery section title */}
                <CardTitle>روش ارسال</CardTitle>
            </CardHeader>

            <CardContent>
                {/* Allow the user to select one delivery method */}
                <RadioGroup
                    value={deliveryMethod}
                    onValueChange={(value) =>
                        dispatch(setDeliveryMethod(value))
                    }
                    className="flex flex-col gap-3">
                    {/* Standard delivery option */}
                    <Label
                        htmlFor="standard"
                        className="flex cursor-pointer items-center justify-between rounded-xs border p-4">
                        <div className="flex items-center gap-3">
                            {/* Select standard delivery */}
                            <RadioGroupItem value="standard" id="standard" />

                            <div className="flex flex-col gap-1">
                                {/* Delivery method name */}
                                <span className="font-medium">ارسال عادی</span>

                                {/* Estimated delivery time */}
                                <span className="text-sm text-muted-foreground">
                                    تحویل در ۲ تا ۴ روز کاری
                                </span>
                            </div>
                        </div>

                        {/* Standard delivery price */}
                        <span className="text-sm font-medium">
                            ۵۰,۰۰۰ تومان
                        </span>
                    </Label>

                    {/* Express delivery option */}
                    <Label
                        htmlFor="express"
                        className="flex cursor-pointer items-center justify-between rounded-xs border p-4">
                        <div className="flex items-center gap-3">
                            {/* Select express delivery */}
                            <RadioGroupItem value="express" id="express" />

                            <div className="flex flex-col gap-1">
                                {/* Delivery method name */}
                                <span className="font-medium">ارسال سریع</span>

                                {/* Estimated delivery time */}
                                <span className="text-sm text-muted-foreground">
                                    تحویل در ۱ تا ۲ روز کاری
                                </span>
                            </div>
                        </div>

                        {/* Express delivery price */}
                        <span className="text-sm font-medium">
                            ۹۰,۰۰۰ تومان
                        </span>
                    </Label>
                </RadioGroup>
            </CardContent>

            <CardFooter className="flex items-center gap-1.5 border-t bg-card pt-4">
                {/* Return to the shipping information step */}
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/checkout/shipping")}>
                    بازگشت
                </Button>

                {/* Continue to the payment step */}
                <Button
                    type="button"
                    size="lg"
                    onClick={() => navigate("/checkout/payment")}>
                    ادامه
                </Button>
            </CardFooter>
        </Card>
    );
};

export default DeliveryStep;
