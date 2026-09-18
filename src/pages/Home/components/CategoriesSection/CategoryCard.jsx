import PropTypes from "prop-types";
import { Link } from "react-router";
import { formatPersianNumber } from "@/utils/formatter";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CategoryCard = ({ category }) => {
    return (
        // Link to the products filtered by this category
        <Link
            to={`/products?category=${category.slug}`}
            className="group relative overflow-hidden rounded-xl">
            {/* Category image with hover zoom effect */}
            <AspectRatio ratio={4 / 5}>
                <img
                    src={category.image_url}
                    alt={category.name_fa}
                    loading="lazy"
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
            </AspectRatio>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0" />

            {/* Category name and product count */}
            <div className="absolute bottom-4 z-10 flex flex-col w-full px-4">
                {/* Category name */}
                <span className="font-semibold text-sm text-white">
                    {category.name_fa}
                </span>

                {/* Number of products in the category */}
                <span className="text-white/60 text-xs">
                    {formatPersianNumber(category.item_count)} محصول
                </span>
            </div>
        </Link>
    );
};

CategoryCard.propTypes = {
    category: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        name_fa: PropTypes.string.isRequired,
        item_count: PropTypes.number.isRequired,
    }).isRequired,
};

export default CategoryCard;
