import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import PriceRangeFilter from "./PriceRangeFilter";
import ColorFilter from "./ColorFilter";
import BrandFilter from "./BrandFilter";
import SizeFilter from "./SizeFilter";

const FilterAccordion = () => {
    return (
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
    );
};

export default FilterAccordion;
