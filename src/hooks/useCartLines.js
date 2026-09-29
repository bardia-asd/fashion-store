import { useMemo } from "react";
import { useGetVariantDetailsQuery } from "@/features/cart/cartApi";

export const useCartLines = (items) => {
    // Get the variant IDs needed to fetch the latest variant details
    const variantIds = useMemo(
        () => items.map((i) => i.variantId).sort(),
        [items],
    );

    // Fetch product and variant details for the cart items
    const { data = [], isLoading } = useGetVariantDetailsQuery(variantIds);

    // Combine local cart items with their current product and variant data
    const lines = useMemo(
        () =>
            items.flatMap((i) => {
                const variant = data.find((v) => v.id === i.variantId);

                // Skip cart items whose variant details are unavailable
                if (!variant) return [];

                const product = variant.product;
                const images = product.product_images ?? [];

                // Use the thumbnail image or fall back to the first image
                const thumb =
                    images.find((img) => img.is_thumbnail) ?? images[0];

                return {
                    ...i,
                    slug: product.slug,
                    name: product.name_fa,
                    price: product.price,
                    oldPrice: product.old_price,
                    brand: product.brand,
                    image: thumb?.url,
                    size: variant.size,
                    color: variant.colors,
                    stock: variant.stock,
                    lineTotal: product.price * i.quantity,
                };
            }),
        [items, data],
    );

    // Calculate the total price of all cart lines
    const subTotal = useMemo(
        () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
        [lines],
    );

    // Calculate the total quantity of items in the cart
    const itemCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items],
    );

    return {
        lines,
        subTotal,
        itemCount,
        isLoading,
    };
};
