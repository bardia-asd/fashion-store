import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { useProductFilters } from "@/hooks/useProductFilters";

const SORT_OPTIONS = [
    { value: "newest", label: "جدیدترین" },
    { value: "price-asc", label: "ارزانترین" },
    { value: "price-desc", label: "گرانترین" },
];

const ProductSort = () => {
    const { filters, updateFilter } = useProductFilters();

    const currentLabel =
        SORT_OPTIONS.find((opt) => opt.value === filters.sort)?.label ??
        "جدیدترین";

    return (
        <Select
            value={filters.sort}
            onValueChange={(value) => updateFilter("sort", value)}>
            <SelectTrigger size="lg" className="rounded-full bg-transparent!">
                <span>
                    <span className="text-muted-foreground">مرتب‌سازی: </span>
                    {currentLabel}
                </span>
            </SelectTrigger>

            <SelectContent className="-bottom-11">
                {SORT_OPTIONS.map((sort) => (
                    <SelectItem key={sort.value} value={sort.value}>
                        {sort.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default ProductSort;
