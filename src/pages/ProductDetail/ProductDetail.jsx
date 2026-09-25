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
import ProductReviewSection from "./components/ProductReviewSection";
import RelatedProducts from "./components/RelatedProducts";
import BrandLoader from "@/components/common/BrandLoader";

const ProductDetail = () => {
    // Get the product slug from the current URL
    const { productSlug: slug } = useParams();

    // Fetch the product details using its slug
    const { data: product, isLoading } = useGetProductBySlugQuery({ slug });

    // Show the brand loader while the product data is loading
    if (isLoading) return <BrandLoader />;

    return (
        // Product detail page container
        <div className="container-app my-8">
            {/* Breadcrumb navigation */}
            <Breadcrumb>
                <BreadcrumbList>
                    {/* Home breadcrumb */}
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">خانه</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    {/* All products breadcrumb */}
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">
                            همه محصولات
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    {/* Product brand breadcrumb */}
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/products?brands=${product.brand.slug}`}>
                            {product.brand.name_fa}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    {/* Current product breadcrumb */}
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name_fa}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Product gallery and purchase information */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-8">
                {/* Product image gallery */}
                <ProductGallery gallery={product.product_images} />

                {/* Product information and purchase options */}
                <ProductInfo product={product} />
            </section>

            {/* Product description and specifications */}
            <ProductDetailsTabs
                description={product.description}
                specifications={product.specifications}
            />

            {/* Customer reviews */}
            <ProductReviewSection reviews={product.reviews} />

            {/* Related product recommendations */}
            <RelatedProducts
                productId={product.id}
                categoryId={product.category_id}
            />
        </div>
    );
};

export default ProductDetail;
