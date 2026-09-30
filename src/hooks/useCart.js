import { useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/authSelectors";
import { selectGuestCartItems } from "@/features/cart/cartSelectors";
import { useGetServerItemsQuery } from "@/features/cart/cartApi";
import { useCartId } from "./useCartId";

export const useCart = () => {
    const user = useSelector(selectAuthUser);
    const guestItems = useSelector(selectGuestCartItems);

    const { cartId, isLoading: cartLoading, error: cartError } = useCartId();

    const {
        data: serverItems = [],
        isLoading: serverLoading,
        error: serverError,
    } = useGetServerItemsQuery(cartId, {
        skip: !cartId,
    });

    const authenticatedItems = serverItems.map((item) => ({
        variantId: item.variant_id,
        productId: item.product_id,
        quantity: item.quantity,
        cartItemId: item.id,
    }));

    const items = user ? authenticatedItems : guestItems;

    return {
        items,
        isLoading: user ? cartLoading || serverLoading : false,
        error: user ? cartError || serverError : null,
    };
};
