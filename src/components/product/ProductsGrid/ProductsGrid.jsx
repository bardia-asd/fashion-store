import { useGetProductsQuery } from "@/features/products/productsApi";
import { useGetColorsQuery } from "@/features/colors/colorsApi";

import BrandLoader from "@/components/common/BrandLoader";
import ProductsCard from "../ProductsCard";

import { useProductFilters } from "@/hooks/useProductFilters";
import ProductsEmptyState from "./ProductsEmptyState";

const ProductsGrid = ({
    emptyTitle = "محصولی یافت نشد",
    emptyDescription = "با تغییر فیلترها دوباره امتحان کنید.",
}) => {
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

    const isBusy = isLoading || isFetching;
    const isEmpty = !isBusy && (products?.length ?? 0) === 0;

    return (
        <div className="flex flex-col flex-1">
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {isBusy ? (
                    <div className="col-span-full">
                        <BrandLoader size="sm" />
                    </div>
                ) : isEmpty ? (
                    <div className="col-span-full">
                        <ProductsEmptyState
                            title={emptyTitle}
                            description={emptyDescription}
                        />
                    </div>
                ) : (
                    products.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductsGrid;
