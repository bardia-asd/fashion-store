import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/authSelectors";
import {
    useAddServerItemMutation,
    useRemoveServerItemMutation,
    useSetServerQuantityMutation,
} from "@/features/cart/cartApi";
import { useCartId } from "./useCartId";
import {
    addItem,
    removeItem,
    updateQuantity,
} from "@/features/cart/guestCartSlice";
import { useCart } from "./useCart";

export const useCartActions = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectAuthUser);

    const { cartId } = useCartId();
    const { items } = useCart();

    const [addServerItem] = useAddServerItemMutation();
    const [removeServerItem] = useRemoveServerItemMutation();
    const [setServerQuantity] = useSetServerQuantityMutation();

    const addCartItem = async ({ productId, variantId, quantity = 1 }) => {
        const existingItem = items.find((i) => i.variantId === variantId);

        if (!user) {
            dispatch(addItem({ productId, variantId, quantity }));
            return;
        }

        if (!cartId) return;

        if (existingItem) {
            await setServerQuantity({
                itemId: existingItem.cartItemId,
                quantity: existingItem.quantity + quantity,
            }).unwrap();

            return;
        }

        await addServerItem({
            cartId,
            productId,
            variantId,
            quantity,
        }).unwrap();
    };

    const removeCartItem = async ({ variantId, cartItemId }) => {
        if (!user) {
            dispatch(removeItem(variantId));
            return;
        }

        await removeServerItem({
            itemId: cartItemId,
        }).unwrap();
    };

    const updateCartQuantity = async ({ variantId, cartItemId, quantity }) => {
        if (quantity <= 0) {
            if (!user) {
                dispatch(removeItem(variantId));
            } else {
                await removeServerItem({
                    itemId: cartItemId,
                }).unwrap();
            }

            return;
        }

        if (!user) {
            dispatch(
                updateQuantity({
                    variantId,
                    quantity,
                }),
            );

            return;
        }

        await setServerQuantity({
            itemId: cartItemId,
            quantity,
        }).unwrap();
    };

    return { addCartItem, removeCartItem, updateCartQuantity };
};
