import BrandLoader from "@/components/common/BrandLoader";
import ProductsCard from "../ProductsCard";

const ProductsGrid = ({ products, isLoading }) => {
    return (
        <div className="flex-1 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {isLoading ? (
                <div className="col-span-full">
                    <BrandLoader size="sm" />
                </div>
            ) : (
                products?.map((product) => (
                    <ProductsCard key={product.id} product={product} />
                ))
            )}
        </div>
    );
};

export default ProductsGrid;
