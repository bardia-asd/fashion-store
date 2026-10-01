import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    useGetCartPromoCodeQuery,
    useLazyGetPromoCodeQuery,
    useSetCartPromoCodeMutation,
} from "@/features/cart/cartApi";
import { selectAuthUser } from "@/features/auth/authSelectors";
import { useCartId } from "./useCartId";

const GUEST_PROMO_KEY = "guestPromoCode";

export const usePromoCode = (subTotal) => {
    const user = useSelector(selectAuthUser);
    const { cartId, isLoading: isCartLoading } = useCartId();

    const [promoCode, setPromoCode] = useState(null);
    const [error, setError] = useState(null);

    const [getPromoCode, { isFetching: isChecking }] =
        useLazyGetPromoCodeQuery();

    const [setCartPromoCode, { isLoading: isSaving }] =
        useSetCartPromoCodeMutation();

    const { data: cartData, isLoading: isPromoLoading } =
        useGetCartPromoCodeQuery(cartId, {
            skip: !user || !cartId,
        });

    const discount = promoCode
        ? (subTotal * promoCode.discount_percent) / 100
        : 0;

    useEffect(() => {
        if (user) {
            if (!cartData?.promo_code) {
                return;
            }

            const restorePromoCode = async () => {
                try {
                    const promo = await getPromoCode(
                        cartData.promo_code,
                    ).unwrap();

                    if (promo) {
                        setPromoCode(promo);
                    }
                } catch {
                    setPromoCode(null);
                }
            };

            restorePromoCode();

            return;
        }

        const savedCode = localStorage.getItem(GUEST_PROMO_KEY);

        if (!savedCode) {
            return;
        }

        const restorePromoCode = async () => {
            try {
                const promo = await getPromoCode(savedCode).unwrap();

                if (promo) {
                    setPromoCode(promo);
                } else {
                    localStorage.removeItem(GUEST_PROMO_KEY);
                }
            } catch {
                localStorage.removeItem(GUEST_PROMO_KEY);
            }
        };

        restorePromoCode();
    }, [user, cartData, getPromoCode]);

    const applyPromoCode = async (code) => {
        const normalizedCode = code.trim().toUpperCase();

        if (!normalizedCode) {
            setError("کد تخفیف را وارد کنید.");
            return;
        }

        setError(null);

        try {
            const promo = await getPromoCode(normalizedCode).unwrap();

            if (!promo) {
                setError("کد تخفیف معتبر نیست.");
                return;
            }

            if (!user) {
                localStorage.setItem(GUEST_PROMO_KEY, promo.code);

                setPromoCode(promo);

                return;
            }

            if (!cartId) {
                setError("سبد خرید آماده نیست.");
                return;
            }

            await setCartPromoCode({
                cartId,
                promoCode: promo.code,
            }).unwrap();

            setPromoCode(promo);
        } catch {
            setError("کد تخفیف معتبر نیست.");
        }
    };

    const removePromoCode = async () => {
        setError(null);

        try {
            if (!user) {
                localStorage.removeItem(GUEST_PROMO_KEY);

                setPromoCode(null);

                return;
            }

            if (!cartId) {
                return;
            }

            await setCartPromoCode({
                cartId,
                promoCode: null,
            }).unwrap();

            setPromoCode(null);
        } catch {
            setError("حذف کد تخفیف انجام نشد.");
        }
    };

    return {
        promoCode,
        discount,
        error,

        isApplying: isChecking || isSaving || isCartLoading || isPromoLoading,

        applyPromoCode,
        removePromoCode,
    };
};
