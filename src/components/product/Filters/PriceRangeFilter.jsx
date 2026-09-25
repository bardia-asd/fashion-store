import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProductFilters } from "@/hooks/useProductFilters";

import { formatPersianNumber, toPlainNumber } from "@/utils/formatter";

const PRICE_MIN = 100000;
const PRICE_MAX = 20000000;
const PRICE_STEP = 100000;

const PriceRangeFilter = () => {
    // Get the current price filters and update action
    const { filters, updateFilter } = useProductFilters();

    // Use the catalog limits when no price filter is selected
    const urlMin = filters.minPrice ?? PRICE_MIN;
    const urlMax = filters.maxPrice ?? PRICE_MAX;

    // Keep local input values separate from the URL filters until committed
    const [minInput, setMinInput] = useState(formatPersianNumber(urlMin));
    const [maxInput, setMaxInput] = useState(formatPersianNumber(urlMax));

    // Sync the minimum input when the filter changes externally
    useEffect(() => setMinInput(formatPersianNumber(urlMin)), [urlMin]);

    // Sync the maximum input when the filter changes externally
    useEffect(() => setMaxInput(formatPersianNumber(urlMax)), [urlMax]);

    // Commit the minimum price input to the filters
    const commitMin = () => {
        const value = Number(toPlainNumber(minInput));

        updateFilter("min", value === PRICE_MIN ? null : value);
    };

    // Commit the maximum price input to the filters
    const commitMax = () => {
        const value = Number(toPlainNumber(maxInput));

        updateFilter("max", value === PRICE_MAX ? null : value);
    };

    return (
        <>
            {/* Minimum and maximum price inputs */}
            <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1.5">
                    {/* Minimum price label */}
                    <Label htmlFor="price-min" className="font-normal">
                        حداقل
                    </Label>

                    {/* Minimum price input */}
                    <Input
                        id="price-min"
                        type="text"
                        inputMode="numeric"
                        value={minInput}
                        onChange={(e) => setMinInput(e.target.value)}
                        onBlur={commitMin}
                        onKeyDown={(e) => e.key === "Enter" && commitMin()}
                        className="focus-visible:ring-0 bg-transparent! border-0 border-b rounded-none"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    {/* Maximum price label */}
                    <Label htmlFor="price-max" className="font-normal">
                        حداکثر
                    </Label>

                    {/* Maximum price input */}
                    <Input
                        id="price-max"
                        type="text"
                        inputMode="numeric"
                        value={maxInput}
                        onChange={(e) => setMaxInput(e.target.value)}
                        onBlur={commitMax}
                        onKeyDown={(e) => e.key === "Enter" && commitMax()}
                        className="focus-visible:ring-0 bg-transparent! border-0 border-b rounded-none"
                    />
                </div>
            </div>

            {/* Price range slider */}
            <div className="mt-6">
                <Slider
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={[urlMin, urlMax]}
                    onValueChange={([min, max]) => {
                        // Update both price filters from the slider values
                        updateFilter("min", min === PRICE_MIN ? null : min);
                        updateFilter("max", max === PRICE_MAX ? null : max);
                    }}
                />

                {/* Slider range labels */}
                <div className="flex items-center justify-between mt-2 text-xs">
                    <span>ارزانترین</span>
                    <span>گرانترین</span>
                </div>
            </div>
        </>
    );
};

export default PriceRangeFilter;
