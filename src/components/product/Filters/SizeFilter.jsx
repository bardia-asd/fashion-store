import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AVAILABLE_SIZES } from "@/constants/product";

import { useProductFilters } from "@/hooks/useProductFilters";

const SizeFilter = () => {
    // Get the active size filters and update action
    const { filters, updateFilter } = useProductFilters();

    return (
        // Allow multiple sizes to be selected
        <ToggleGroup
            multiple
            value={filters.sizes}
            onValueChange={(value) => updateFilter("sizes", value)}
            className="flex-wrap">
            {/* Render each available size option */}
            {AVAILABLE_SIZES.map((size) => (
                <ToggleGroupItem
                    key={size}
                    value={size}
                    className="px-3 min-w-10 h-9 rounded-full border bg-white data-pressed:bg-primary data-pressed:text-primary-foreground">
                    {size}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
};

export default SizeFilter;
