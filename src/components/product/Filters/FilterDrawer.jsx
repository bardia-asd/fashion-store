import { SlidersHorizontal, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import FilterAccordion from "./FilterAccordion";
import { useProductFilters } from "@/hooks/useProductFilters";

const FilterDrawer = () => {
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
        // Mobile filter drawer
        <Drawer>
            {/* Button that opens the filter drawer */}
            <DrawerTrigger
                render={
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full bg-transparent! md:hidden">
                        <SlidersHorizontal />
                        فیلترها
                    </Button>
                }
            />

            {/* Drawer content with a fixed header and footer */}
            <DrawerContent className="max-h-[85vh] h-full">
                {/* Drawer header with close button and title */}
                <DrawerHeader className="flex-row items-center gap-3">
                    {/* Close the drawer */}
                    <DrawerClose>
                        <XIcon size={16} />
                    </DrawerClose>

                    {/* Drawer title */}
                    <DrawerTitle className="text-right">فیلترها</DrawerTitle>
                </DrawerHeader>

                {/* Scrollable filter sections */}
                <div className="overflow-y-auto flex-1 p-4">
                    <FilterAccordion />
                </div>

                {/* Filter actions */}
                <DrawerFooter className="flex-row gap-2">
                    {/* Apply filters and close the drawer */}
                    <DrawerClose
                        render={
                            <Button size="lg" className="flex-1 h-12">
                                اعمال فیلتر
                            </Button>
                        }
                    />

                    {/* Clear all active filters */}
                    <Button
                        variant="link"
                        className="h-12"
                        disabled={!hasActiveFilters}
                        onClick={clearFilters}>
                        پاک کردن
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default FilterDrawer;
