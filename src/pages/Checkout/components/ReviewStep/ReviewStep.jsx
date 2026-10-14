import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import {
    selectDeliveryMethod,
    selectPaymentMethod,
    selectShippingAddress,
} from "@/features/checkout/checkoutSelectors";
import { useCartId } from "@/hooks/useCartId";
import { useClearCartMutation } from "@/features/cart/cartApi";
import { useOrder } from "@/hooks/useOrder";

const ReviewStep = () => {
    // Get the checkout navigation helper
    const navigate = useNavigate();

    // Get the saved checkout information from Redux
    const shippingAddress = useSelector(selectShippingAddress);
    const deliveryMethod = useSelector(selectDeliveryMethod);
    const paymentMethod = useSelector(selectPaymentMethod);

    const { cartId } = useCartId();
    const { createOrder, isLoading: isCreatingOrder } = useOrder();

    const [clearCart, { isLoading: isClearingCart }] = useClearCartMutation();

    const handleConfirmOrder = async () => {
        try {
            const order = await createOrder();

            await clearCart(cartId).unwrap();

            navigate(`/success-order/DBY-${order[0].order_number}`);
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    const isSubmitting = isCreatingOrder || isClearingCart;

    return (
        // Final order review card
        <Card>
            <CardHeader>
                {/* Review section title */}
                <CardTitle>بررسی نهایی</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                {/* Shipping information */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        {/* Shipping information title */}
                        <CardTitle className="text-base">
                            اطلاعات گیرنده
                        </CardTitle>

                        {/* Navigate back to edit shipping information */}
                        <Button
                            variant="link"
                            type="button"
                            onClick={() => navigate("/checkout/shipping")}>
                            تغییر
                        </Button>
                    </CardHeader>

                    <CardContent className="text-sm text-muted-foreground">
                        {/* Recipient name */}
                        <p>
                            {shippingAddress?.firstName}
                            {shippingAddress?.lastName}
                        </p>

                        {/* Recipient phone number */}
                        <p>{shippingAddress?.phone}</p>

                        {/* Shipping address and building details */}
                        <p>
                            {shippingAddress?.address}، پلاک
                            {shippingAddress?.plaque}
                            {shippingAddress?.unit &&
                                `، واحد ${shippingAddress.unit}`}
                        </p>

                        {/* Postal code */}
                        <p>{shippingAddress?.postalCode}</p>
                    </CardContent>
                </Card>

                {/* Delivery information */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        {/* Delivery method title */}
                        <CardTitle className="text-base">روش ارسال</CardTitle>

                        {/* Navigate back to edit delivery method */}
                        <Button
                            variant="link"
                            type="button"
                            onClick={() => navigate("/checkout/delivery")}>
                            تغییر
                        </Button>
                    </CardHeader>

                    <CardContent className="text-sm text-muted-foreground">
                        {/* Display the selected delivery method */}
                        {deliveryMethod === "standard" ? (
                            <>
                                {/* Standard delivery name */}
                                <p className="font-medium text-foreground">
                                    ارسال عادی
                                </p>

                                {/* Standard delivery time */}
                                <p>تحویل در ۲ تا ۴ روز کاری</p>

                                {/* Standard delivery price */}
                                <p>۵۰,۰۰۰ تومان</p>
                            </>
                        ) : (
                            <>
                                {/* Express delivery name */}
                                <p className="font-medium text-foreground">
                                    ارسال سریع
                                </p>

                                {/* Express delivery time */}
                                <p>تحویل در ۱ تا ۲ روز کاری</p>

                                {/* Express delivery price */}
                                <p>۹۰,۰۰۰ تومان</p>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Payment information */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        {/* Payment method title */}
                        <CardTitle className="text-base">روش پرداخت</CardTitle>

                        {/* Navigate back to edit payment method */}
                        <Button
                            variant="link"
                            type="button"
                            onClick={() => navigate("/checkout/payment")}>
                            تغییر
                        </Button>
                    </CardHeader>

                    <CardContent className="text-sm text-muted-foreground">
                        {/* Display the selected payment method */}
                        {paymentMethod === "online" && (
                            <>
                                {/* Payment method name */}
                                <p className="font-medium text-foreground">
                                    پرداخت آنلاین
                                </p>

                                {/* Payment method description */}
                                <p>پرداخت امن با کارت بانکی</p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </CardContent>

            <CardFooter className="flex items-center justify-end border-t bg-card pt-4">
                {/* Confirm the order and proceed to payment */}
                <Button
                    size="lg"
                    type="button"
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}>
                    {isSubmitting ? "در حال پردازش..." : "تایید و پرداخت"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ReviewStep;
