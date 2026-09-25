import { useGetColorsQuery } from "@/features/colors/colorsApi";
import { useProductFilters } from "@/hooks/useProductFilters";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Spinner } from "@/components/ui/spinner";

const ColorFilter = () => {
    const { filters, updateFilter } = useProductFilters();
    const { data: colors, isLoading } = useGetColorsQuery();

    if (isLoading)
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        );

    return (
        <ToggleGroup
            multiple
            value={filters.colors}
            onValueChange={(value) => updateFilter("colors", value)}
            className="mt-1.5 flex-wrap">
            {colors.map((color) => (
                <ToggleGroupItem
                    key={color.id}
                    value={color.name_en}
                    className="size-9 rounded-full p-0 data-pressed:ring data-pressed:ring-primary">
                    <span
                        className="size-8 rounded-full"
                        style={{ backgroundColor: color.hex_code }}
                    />
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
};

export default ColorFilter;
