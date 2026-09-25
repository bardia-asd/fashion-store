import { useSearchParams } from "react-router";

export const useProductFilters = () => {
    // Read and update product filters through the URL search parameters
    const [searchParams, setSearchParams] = useSearchParams();

    // Parse the current filters from the URL
    const filters = {
        category: searchParams.get("category") ?? "all",
        brands: searchParams.get("brands")?.split(",").filter(Boolean) ?? [],
        colors: searchParams.get("colors")?.split(",").filter(Boolean) ?? [],
        sizes: searchParams.get("sizes")?.split(",").filter(Boolean) ?? [],
        minPrice: searchParams.get("min")
            ? Number(searchParams.get("min"))
            : null,
        maxPrice: searchParams.get("max")
            ? Number(searchParams.get("max"))
            : null,
        sort: searchParams.get("sort") ?? "newest",
    };

    // Update a single filter in the URL
    const updateFilter = (key, value) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);

            // Remove the parameter when the filter has no active value
            const isEmpty =
                value == null ||
                value === "" ||
                value === "all" ||
                (Array.isArray(value) && value.length === 0);

            if (isEmpty) {
                next.delete(key);
            } else if (Array.isArray(value)) {
                // Store multiple filter values as a comma-separated list
                next.set(key, value.join(","));
            } else {
                // Store single filter values directly
                next.set(key, String(value));
            }

            return next;
        });
    };

    // Toggle a value inside an array-based filter
    const toggleArrayFilter = (key, value) => {
        const current = filters[key] ?? [];

        // Add the value when it is not selected, otherwise remove it
        const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];

        updateFilter(key, next);
    };

    // Remove all product filters from the URL
    const clearFilters = () => {
        setSearchParams(new URLSearchParams());
    };

    return {
        filters,
        updateFilter,
        toggleArrayFilter,
        clearFilters,
    };
};
