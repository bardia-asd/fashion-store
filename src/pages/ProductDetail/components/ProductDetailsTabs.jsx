import PropTypes from "prop-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { specificationLabels } from "@/constants/product";

const ProductDetailsTabs = ({ description, specifications }) => {
    return (
        // Product details section with description and specifications tabs
        <div className="mt-10 lg:mt-16">
            <Tabs defaultValue="description">
                {/* Tabs navigation */}
                <TabsList className="bg-transparent!">
                    {/* Description tab */}
                    <TabsTrigger
                        value="description"
                        className="bg-transparent! px-3.5 py-2 h-auto">
                        توضیحات
                    </TabsTrigger>

                    {/* Specifications tab */}
                    <TabsTrigger
                        value="specifications"
                        className="bg-transparent! px-3.5 py-2 h-auto">
                        مشخصات
                    </TabsTrigger>
                </TabsList>

                {/* Product description content */}
                <TabsContent value="description" className="pt-4">
                    <p className="leading-6 lg:text-base text-foreground/65">
                        {description}
                    </p>
                </TabsContent>

                {/* Product specifications content */}
                <TabsContent value="specifications">
                    {/* Render each specification with its Persian label */}
                    {Object.entries(specifications).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex items-center justify-between py-3 text-sm border-b">
                            {/* Specification label */}
                            <span className="text-muted-foreground">
                                {specificationLabels[key]}
                            </span>

                            {/* Specification value */}
                            <span>{value}</span>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
};

ProductDetailsTabs.propTypes = {
    description: PropTypes.string.isRequired,
    specifications: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProductDetailsTabs;
