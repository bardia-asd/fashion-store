import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

import ProductsCard, {
    ProductCardSkeleton,
} from "@/components/product/ProductsCard";
import { selectAuthUser } from "@/features/auth/authSelectors";
import { useGetWishlistQuery } from "@/features/wishlist/wishlistApi";
import { formatPersianNumber } from "@/utils/formatter";

import ClearWishlistButton from "./components/ClearWishlistButton";

const Wishlist = () => {
    // Get the currently authenticated user
    const user = useSelector(selectAuthUser);

    // Fetch the user's wishlist when they are authenticated
    const { data: wishlistItems = [], isLoading } = useGetWishlistQuery(
        user?.id,
        {
            skip: !user?.id,
        },
    );

    return (
        // Wishlist page container
        <div className="container-app my-8">
            {/* Wishlist header and summary */}
            <div className="mb-8 flex flex-col gap-2 border-b border-border pb-6">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        {/* Editorial section label */}
                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Saved Items
                        </p>

                        {/* Page title */}
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            علاقه‌مندی‌ها
                        </h1>
                    </div>

                    {/* Wishlist item count and clear action */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                            {formatPersianNumber(wishlistItems.length)} محصول
                        </span>

                        {/* Show clear button when the wishlist contains items */}
                        {wishlistItems.length > 0 && (
                            <ClearWishlistButton userId={user.id} />
                        )}
                    </div>
                </div>

                {/* Wishlist description */}
                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                    محصولاتی که برای بعد ذخیره کرده‌اید، اینجا در دسترس شما
                    هستند.
                </p>
            </div>

            {/* Wishlist products grid */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {/* Show skeletons while the wishlist is loading */}
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))
                ) : wishlistItems.length === 0 ? (
                    // Show an empty state when the wishlist has no products
                    <div className="col-span-full flex min-h-40 lg:min-h-72 flex-col items-center justify-center text-center">
                        {/* Empty wishlist title */}
                        <h2 className="text-lg font-medium">
                            لیست علاقه‌مندی‌ها خالی است
                        </h2>

                        {/* Empty wishlist description */}
                        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            هنوز محصولی به لیست علاقه‌مندی‌های خود اضافه
                            نکرده‌اید.
                        </p>

                        {/* Link to browse products */}
                        <Link
                            to="/products"
                            className="mt-6 text-sm font-medium underline underline-offset-4">
                            مشاهده محصولات
                        </Link>
                    </div>
                ) : (
                    // Render each saved product
                    wishlistItems.map((item) => (
                        <ProductsCard key={item.id} product={item.product} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;
