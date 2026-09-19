import { useState } from "react";
import { Link } from "react-router";

import { useGetTrendingProductsQuery } from "@/features/products/productsApi";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import SectionHeader from "./SectionHeader";
import ProductsCard from "@/components/product/ProductsCard";

const productFilters = [
    {
        value: "all",
        label: "همه",
    },
    {
        value: "best-seller",
        label: "پرفروش‌ترین",
    },
    {
        value: "sale",
        label: "حراج",
    },
    {
        value: "premium",
        label: "پریمیوم",
    },
];

const TrendingProducts = () => {
    // Track the currently selected product filter
    const [filter, setFilter] = useState("all");

    // Fetch trending products
    const { data: trending, isLoading } = useGetTrendingProductsQuery();

    return (
        // Trending products section
        <section className="py-20 lg:py-28 bg-muted">
            <div className="container-app">
                {/* Section title and product filter controls */}
                <SectionHeader
                    eyebrow="منتخب شما"
                    title="ترندهای این روزها"
                    actions={
                        <ToggleGroup
                            value={[filter]}
                            onValueChange={(value) => {
                                // Keep the current filter when no option is selected
                                if (value.length === 0) return;

                                // Update the selected filter
                                setFilter(value[0]);
                            }}>
                            {/* Render each available product filter */}
                            {productFilters.map((item) => (
                                <ToggleGroupItem
                                    key={item.value}
                                    value={item.value}
                                    className="rounded-full border bg-white data-pressed:bg-primary data-pressed:text-primary-foreground">
                                    {item.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    }
                />

                {/* Product grid and view-all action */}
                <div className="flex flex-col gap-12">
                    {/* Trending products grid */}
                    <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
                        {isLoading ? (
                            // Placeholder while trending products are loading
                            <div></div>
                        ) : (
                            // Render each trending product
                            trending.map((product) => (
                                <ProductsCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        )}
                    </div>

                    {/* Link to view all products */}
                    <div className="mx-auto">
                        <Button
                            variant="outline"
                            nativeButton={false}
                            className="rounded-full border-primary! h-12 px-10"
                            render={
                                <Link to="/products">مشاهده همه محصولات</Link>
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
