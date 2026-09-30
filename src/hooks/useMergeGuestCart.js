import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthUser } from "@/features/auth/authSelectors";
import { selectGuestCartItems } from "@/features/cart/cartSelectors";
import {
    useAddServerItemMutation,
    useGetServerItemsQuery,
    useSetServerQuantityMutation,
} from "@/features/cart/cartApi";
import { clearGuestCart } from "@/features/cart/guestCartSlice";
import { useCartId } from "./useCartId";

export const useMergeGuestCart = () => {
    const dispatch = useDispatch();

    const guestItems = useSelector(selectGuestCartItems);
    const user = useSelector(selectAuthUser);

    const { cartId, isLoading: isCartLoading, error: cartError } = useCartId();

    const [isMerging, setIsMerging] = useState(false);

    const mergeStarted = useRef(false);

    const [setServerQuantity] = useSetServerQuantityMutation();

    const [addServerItem] = useAddServerItemMutation();

    const {
        data: serverItems = [],
        error: serverItemsError,
        isLoading: isServerItemsLoading,
    } = useGetServerItemsQuery(cartId, {
        skip: !cartId,
    });

    const mergeGuestCart = async () => {
        if (!user?.id) return;
        if (!cartId) return;
        if (isCartLoading || isServerItemsLoading) return;

        if (cartError) {
            throw cartError;
        }

        if (serverItemsError) {
            throw serverItemsError;
        }

        if (guestItems.length === 0) return;

        setIsMerging(true);

        try {
            for (const guestItem of guestItems) {
                const serverItem = serverItems.find(
                    (item) => item.variant_id === guestItem.variantId,
                );

                if (serverItem) {
                    await setServerQuantity({
                        itemId: serverItem.id,
                        quantity: serverItem.quantity + guestItem.quantity,
                    }).unwrap();
                } else {
                    await addServerItem({
                        cartId,
                        productId: guestItem.productId,
                        variantId: guestItem.variantId,
                        quantity: guestItem.quantity,
                    }).unwrap();
                }
            }

            dispatch(clearGuestCart());
        } finally {
            setIsMerging(false);
        }
    };

    useEffect(() => {
        if (!user?.id) {
            mergeStarted.current = false;
            return;
        }

        if (!cartId) return;
        if (isCartLoading || isServerItemsLoading) return;
        if (cartError || serverItemsError) return;
        if (guestItems.length === 0) return;
        if (mergeStarted.current) return;

        mergeStarted.current = true;

        mergeGuestCart().catch((error) => {
            console.error("Failed to merge guest cart:", error);

            mergeStarted.current = false;
        });
    }, [
        user?.id,
        cartId,
        isCartLoading,
        cartError,
        isServerItemsLoading,
        serverItemsError,
        guestItems.length,
    ]);

    return {
        mergeGuestCart,
        isMerging,
    };
};
