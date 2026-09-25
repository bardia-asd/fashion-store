import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetCategoriesQuery } from "@/features/categories/categoriesApi";
import { useProductFilters } from "@/hooks/useProductFilters";

const CategoryFilter = () => {
    // Get the active category filter and update action
    const { filters, updateFilter } = useProductFilters();

    // Fetch available categories
    const { data: categories, isLoading } = useGetCategoriesQuery();

    // Wait for categories to load before rendering the filter
    if (isLoading) return null;

    return (
        // Allow selecting a single category
        <ToggleGroup
            value={[filters.category]}
            onValueChange={(value) => {
                // Keep the current category when the selection is cleared
                if (value.length === 0) return;

                // Update the selected category
                if (value) updateFilter("category", value[0]);
            }}
            className="flex-wrap">
            {/* Show all products */}
            <ToggleGroupItem
                value="all"
                className="px-3 min-w-10 h-9 rounded-full border bg-white data-pressed:bg-primary data-pressed:text-primary-foreground">
                همه
            </ToggleGroupItem>

            {/* Render each category option */}
            {categories.map((category) => (
                <ToggleGroupItem
                    key={category.id}
                    value={category.slug}
                    className="px-3 min-w-10 h-9 rounded-full border bg-white data-pressed:bg-primary data-pressed:text-primary-foreground">
                    {category.name_fa}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
};

export default CategoryFilter;
