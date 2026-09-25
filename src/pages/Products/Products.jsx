import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import FilterSidebar, { FilterDrawer } from "@/components/product/Filters";
import ProductsGrid from "@/components/product/ProductsGrid";
import CategoryFilter from "@/components/product/Filters/CategoryFilter";
import ProductSort from "@/components/product/ProductSort";

const Products = () => {
    return (
        // Products page container
        <div className="container-app my-8">
            {/* Breadcrumb navigation */}
            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                    {/* Home breadcrumb */}
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">خانه</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    {/* Current products page */}
                    <BreadcrumbItem>
                        <BreadcrumbPage>همه محصولات</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Page title */}
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mt-3">
                همه محصولات
            </h2>

            {/* Category filter */}
            <div className="flex items-center justify-between my-8">
                <div className="hidden md:block">
                    <CategoryFilter />
                </div>

                <FilterDrawer />

                <ProductSort />
            </div>

            {/* Sidebar filters and product results */}
            <section className="flex items-start gap-8">
                {/* Desktop filter sidebar */}
                <FilterSidebar />

                {/* Product grid with loading states */}
                <ProductsGrid />
            </section>
        </div>
    );
};

export default Products;
