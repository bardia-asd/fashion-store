import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import SectionHeader from "../SectionHeader";
import { useGetNewProductsQuery } from "@/features/products/productsApi";
import ProductsCard, {
    ProductCardSkeleton,
} from "@/components/product/ProductsCard";

const NewArrivalProducts = () => {
    // Fetch the latest products and track the loading state
    const { data: products, isLoading } = useGetNewProductsQuery();

    return (
        // New arrivals section
        <section className="py-20 lg:py-28 bg-muted">
            <div className="container-app">
                {/* Section title and view-all action */}
                <SectionHeader
                    eyebrow="تازه رسیده"
                    title="محصولات جدید"
                    actions={
                        <Button
                            nativeButton={false}
                            variant="link"
                            render={
                                <Link to="/products">
                                    مشاهده همه <ArrowLeft />
                                </Link>
                            }
                        />
                    }
                />

                {/* Responsive product grid */}
                <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
                    {/* Show skeletons while products are loading */}
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, index) => (
                              <ProductCardSkeleton key={index} />
                          ))
                        : products?.map((product) => (
                              // Render each new arrival product
                              <ProductsCard
                                  key={product.id}
                                  product={product}
                              />
                          ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrivalProducts;
