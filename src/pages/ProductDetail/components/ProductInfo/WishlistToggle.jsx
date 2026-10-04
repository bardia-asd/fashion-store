import PropTypes from "prop-types";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import { Toggle } from "@/components/ui/toggle";
import { selectAuthUser } from "@/features/auth/authSelectors";
import {
    useAddToWishlistMutation,
    useGetWishlistQuery,
    useRemoveFromWishlistMutation,
} from "@/features/wishlist/wishlistApi";

// Toggle the current product in the user's wishlist
const WishlistToggle = ({ productId }) => {
    // Get navigation helpers for redirecting unauthenticated users
    const navigate = useNavigate();
    const location = useLocation();

    // Get the currently authenticated user
    const user = useSelector(selectAuthUser);

    // Fetch the user's wishlist when authenticated
    const { data: wishlist } = useGetWishlistQuery(user?.id, {
        skip: !user?.id,
    });

    // Get mutations for adding and removing wishlist items
    const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
    const [removeFromWishlist, { isLoading: isRemoving }] =
        useRemoveFromWishlistMutation();

    // Check whether the current product is already in the wishlist
    const isWishlisted =
        wishlist?.some((item) => item.product_id === productId) ?? false;

    // Disable the toggle while a wishlist mutation is running
    const isLoading = isAdding || isRemoving;

    // Add or remove the product based on the new toggle state
    const handlePressedChange = (pressed) => {
        // Redirect unauthenticated users to the sign-in page
        if (!user) {
            toast.info("برای افزودن به علاقه‌مندی‌ها وارد شوید");

            navigate("/signin", {
                state: {
                    from: location.pathname + location.search,
                },
            });

            return;
        }

        // Add the product when the toggle is pressed
        if (pressed) {
            addToWishlist({ productId, userId: user.id });
        } else {
            // Remove the product when the toggle is unpressed
            removeFromWishlist({ productId, userId: user.id });
        }
    };

    return (
        // Wishlist toggle button
        <Toggle
            variant="outline"
            aria-label={
                isWishlisted
                    ? "حذف از علاقه‌مندی‌ها"
                    : "افزودن به علاقه‌مندی‌ها"
            }
            pressed={isWishlisted}
            onPressedChange={handlePressedChange}
            disabled={isLoading}
            className="group h-13 w-14 rounded-xl data-pressed:bg-transparent">
            {/* Heart icon changes appearance when the product is wishlisted */}
            <Heart className="transition-colors group-data-pressed:fill-red-600 group-data-pressed:text-red-600" />
        </Toggle>
    );
};

WishlistToggle.propTypes = {
    productId: PropTypes.string.isRequired,
};

export default WishlistToggle;
