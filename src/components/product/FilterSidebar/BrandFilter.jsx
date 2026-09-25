import { useState } from "react";
import { useGetBrandsQuery } from "@/features/brands/brandsApi";

import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { useProductFilters } from "@/hooks/useProductFilters";

const BrandFilter = () => {
    // Get the active brand filters and toggle action
    const { filters, toggleArrayFilter } = useProductFilters();

    // Fetch available brands
    const { data: brands, isLoading } = useGetBrandsQuery();

    // Store the brand search query
    const [search, setSearch] = useState("");

    // Show a loading spinner while brands are being fetched
    if (isLoading)
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        );

    // Filter brands based on the Persian or English name
    const filteredBrands = brands.filter((brand) => {
        const query = search.trim().toLowerCase();

        // Show all brands when the search field is empty
        if (!query) return true;

        return (
            brand.name_fa.toLowerCase().includes(query) ||
            brand.name_en.toLowerCase().includes(query)
        );
    });

    return (
        <>
            {/* Brand search input */}
            <Input
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو برند ..."
                className="focus-visible:ring-0"
            />

            {/* Filtered brand list */}
            <div className="flex flex-col gap-2 mt-3">
                {filteredBrands.map((brand) => (
                    <Field key={brand.id} orientation="horizontal">
                        {/* Brand selection checkbox */}
                        <Checkbox
                            id={brand.slug}
                            checked={filters.brands.includes(brand.slug)}
                            onCheckedChange={() =>
                                toggleArrayFilter("brands", brand.slug)
                            }
                        />

                        {/* Brand names */}
                        <Label
                            htmlFor={brand.slug}
                            className="justify-between flex-1">
                            {brand.name_fa}

                            {/* English brand name */}
                            <span className="text-muted-foreground text-xs">
                                {brand.name_en}
                            </span>
                        </Label>
                    </Field>
                ))}
            </div>
        </>
    );
};

export default BrandFilter;
