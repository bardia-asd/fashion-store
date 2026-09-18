import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetCategoriesQuery } from "@/features/categories/categoriesApi";

import SectionHeader from "../SectionHeader";
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
    // Fetch categories and track the request state
    const {
        data: categories,
        error,
        isLoading,
        refetch,
    } = useGetCategoriesQuery();

    // Show an error state with a retry action
    if (error) {
        return (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
                <p className="text-muted-foreground">
                    مشکلی در بارگذاری دسته‌بندی‌ها پیش آمد
                </p>

                {/* Retry the failed request */}
                <Button variant="outline" onClick={refetch}>
                    تلاش مجدد
                </Button>
            </div>
        );
    }

    return (
        // Categories section
        <section className="py-20 lg:py-28">
            <div className="container-app">
                {/* Section title and view-all action */}
                <SectionHeader
                    eyebrow="مرور کنید"
                    title="خرید بر اساس دسته‌بندی"
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

                {/* Responsive category grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* Show skeleton cards while categories are loading */}
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <div
                                  key={index}
                                  className="relative aspect-4/5 overflow-hidden rounded-xl">
                                  <Skeleton className="size-full" />

                                  {/* Skeleton placeholders for category details */}
                                  <div className="absolute bottom-4 flex w-full flex-col gap-2 px-4">
                                      <Skeleton className="h-4 w-20" />
                                      <Skeleton className="h-3 w-14" />
                                  </div>
                              </div>
                          ))
                        : categories.map((cat) => (
                              // Render each category card
                              <CategoryCard key={cat.id} category={cat} />
                          ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
