import { useGetProductsQuery } from "@/features/products/productsApi";
import { useGetColorsQuery } from "@/features/colors/colorsApi";

import BrandLoader from "@/components/common/BrandLoader";
import ProductsCard from "../ProductsCard";

import { useProductFilters } from "@/hooks/useProductFilters";

const ProductsGrid = () => {
    // Get the active product filters from the URL
    const { filters } = useProductFilters();

    // Fetch all colors to convert selected color names into IDs
    const { data: allColors } = useGetColorsQuery();

    // Map selected color names to their database IDs
    const colorIds = filters.colors
        .map((name) => allColors?.find((color) => color.name_en === name)?.id)
        .filter(Boolean);

    // Fetch products using the active filters
    const {
        data: products,
        isLoading,
        isFetching,
    } = useGetProductsQuery({
        ...filters,
        colors: colorIds,
    });

    return (
        <div className="flex-1 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {isLoading || isFetching ? (
                <div className="col-span-full">
                    <BrandLoader size="sm" />
                </div>
            ) : (
                products.map((product) => (
                    <ProductsCard key={product.id} product={product} />
                ))
            )}
        </div>
    );
};

export default ProductsGrid;
