import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import PriceRangeFilter from "./PriceRangeFilter";
import ColorFilter from "./ColorFilter";
import BrandFilter from "./BrandFilter";
import SizeFilter from "./SizeFilter";

import { useProductFilters } from "@/hooks/useProductFilters";

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
            <Accordion>
                {/* Price range filter */}
                <AccordionItem>
                    <AccordionTrigger className="hover:no-underline">
                        محدوده قیمت
                    </AccordionTrigger>
                    <AccordionContent className="px-1">
                        <PriceRangeFilter />
                    </AccordionContent>
                </AccordionItem>

                {/* Color filter */}
                <AccordionItem>
                    <AccordionTrigger className="hover:no-underline">
                        رنگ‌ها
                    </AccordionTrigger>
                    <AccordionContent className="px-1">
                        <ColorFilter />
                    </AccordionContent>
                </AccordionItem>

                {/* Brand filter with scrollable list */}
                <AccordionItem>
                    <AccordionTrigger className="hover:no-underline">
                        برند‌ها
                    </AccordionTrigger>
                    <AccordionContent className="px-1 max-h-44 overflow-y-auto scrollbar-thin">
                        <BrandFilter />
                    </AccordionContent>
                </AccordionItem>

                {/* Size filter with scrollable list */}
                <AccordionItem>
                    <AccordionTrigger className="hover:no-underline">
                        سایز‌ها
                    </AccordionTrigger>
                    <AccordionContent className="px-1 max-h-44 overflow-y-auto scrollbar-thin">
                        <SizeFilter />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    );
};

export default FilterSidebar;
