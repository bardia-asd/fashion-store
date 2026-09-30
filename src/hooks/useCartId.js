import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/authSelectors";
import { getOrCreateCartId } from "@/services/supabase/getOrCreateCartId";

export const useCartId = () => {
    const user = useSelector(selectAuthUser);

    const [cartId, setCartId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.id) {
            setCartId(null);
            return;
        }

        const getCart = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const id = await getOrCreateCartId(user.id);
                setCartId(id);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        getCart();
    }, [user?.id]);

    return {
        cartId,
        isLoading,
        error,
    };
};
