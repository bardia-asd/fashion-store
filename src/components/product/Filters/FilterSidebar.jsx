import { Button } from "@/components/ui/button";

import { useProductFilters } from "@/hooks/useProductFilters";
import FilterAccordion from "./FilterAccordion";

const FilterSidebar = () => {
    // Get the current filters and reset action
    const { filters, clearFilters } = useProductFilters();

    // Check whether any filter is currently active
    const hasActiveFilters =
        filters.category !== "all" ||
        filters.brands.length > 0 ||
        filters.colors.length > 0 ||
        filters.sizes.length > 0 ||
        filters.minPrice != null ||
        filters.maxPrice != null;

    return (
        // Sticky desktop filter sidebar
        <aside className="sticky top-24 shrink-0 w-64 p-4 border shadow rounded-2xl hidden md:block">
            {/* Filter header and reset action */}
            <div className="flex items-center justify-between">
                {/* Filter title */}
                <span className="font-semibold text-lg px-1">فیلترها</span>

                {/* Show reset action when filters are active */}
                {hasActiveFilters && (
                    <Button
                        variant="link"
                        className="text-xs font-semibold"
                        onClick={clearFilters}>
                        حذف فیلترها
                    </Button>
                )}
            </div>

            {/* Collapsible filter sections */}
            <FilterAccordion />
        </aside>
    );
};

export default FilterSidebar;
