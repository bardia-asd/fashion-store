import { useSelector } from "react-redux";
import { useCart } from "./useCart";
import { useCartLines } from "./useCartLines";
import {
    selectDeliveryMethod,
    selectPaymentMethod,
    selectShippingAddress,
} from "@/features/checkout/checkoutSelectors";
import {
    useCreateOrderItemsMutation,
    useCreateOrderMutation,
} from "@/features/orders/ordersApi";
import { selectAuthUser } from "@/features/auth/authSelectors";

export const useOrder = () => {
    const { items } = useCart();
    const { lines, subTotal } = useCartLines(items);

    const user = useSelector(selectAuthUser);
    const shippingAddress = useSelector(selectShippingAddress);
    const deliveryMethod = useSelector(selectDeliveryMethod);
    const paymentMethod = useSelector(selectPaymentMethod);

    const shippingCost = deliveryMethod === "standard" ? 50_000 : 90_000;

    const total = subTotal + shippingCost;

    const orderData = {
        user_id: user.id,
        subtotal: subTotal,
        shipping_cost: shippingCost,
        total,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        delivery_method: deliveryMethod,
    };

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [createOrderItems] = useCreateOrderItemsMutation();

    const handleCreateOrder = async () => {
        try {
            const order = await createOrder(orderData).unwrap();

            const orderItems = lines.map((line) => ({
                order_id: order[0].id,
                product_id: line.productId,
                variant_id: line.variantId,
                quantity: line.quantity,
                unit_price: line.price,
                total_price: line.lineTotal,
            }));

            await createOrderItems(orderItems).unwrap();

            return order;
        } catch (error) {
            console.error("Failed to create order:", error);
            throw error;
        }
    };

    return {
        createOrder: handleCreateOrder,
        isLoading,
    };
};
