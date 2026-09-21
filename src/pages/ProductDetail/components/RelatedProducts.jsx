import PropTypes from "prop-types";
import { useGetRelatedProductsQuery } from "@/features/products/productsApi";
import ProductsCard, {
    ProductCardSkeleton,
} from "@/components/product/ProductsCard";

const RelatedProducts = ({ productId, categoryId }) => {
    // Fetch products related to the current product and category
    const { data: products, isLoading } = useGetRelatedProductsQuery({
        id: productId,
        categoryId,
    });

    // Hide the section when no related products are available
    if (!products?.length) return null;

    return (
        // Related products section
        <section className="mt-20 mb-8">
            {/* Section title */}
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
                شاید این‌ها را هم بپسندید
            </h2>

            {/* Related products grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {isLoading
                    ? // Show skeleton cards while products are loading
                      Array.from({ length: 4 }).map((_, i) => (
                          <ProductCardSkeleton key={i} />
                      ))
                    : // Render each related product
                      products.map((product) => (
                          <ProductsCard key={product.id} product={product} />
                      ))}
            </div>
        </section>
    );
};

RelatedProducts.propTypes = {
    productId: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
};

export default RelatedProducts;
