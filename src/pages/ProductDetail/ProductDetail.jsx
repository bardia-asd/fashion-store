import { useParams } from "react-router";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useGetProductBySlugQuery } from "@/features/products/productsApi";

import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductDetailsTabs from "./components/ProductDetailsTabs";

const ProductDetail = () => {
    const { productSlug: slug } = useParams();

    const { data: product, isLoading } = useGetProductBySlugQuery(slug);

    if (isLoading) return null;
    console.log(product);

    return (
        <div className="container-app my-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">خانه</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">
                            همه محصولات
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/products?brand=${product.brand.slug}`}>
                            {product.brand.name_fa}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name_fa}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-8">
                <ProductGallery gallery={product.product_images} />
                <ProductInfo product={product} />
            </section>

            <ProductDetailsTabs
                description={product.description}
                specifications={product.specifications}
            />
        </div>
    );
};

export default ProductDetail;
