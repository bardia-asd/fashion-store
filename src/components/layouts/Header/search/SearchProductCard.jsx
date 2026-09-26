import { Link } from "react-router";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatPersianNumber } from "@/utils/formatter";

const SearchProductCard = () => {
    return (
        // Product card displayed in the search overlay
        <article>
            {/* Link to the product details page */}
            <Link to={`/search?q=${encodeURIComponent("ژاکت جین کلاسیک")}`}>
                {/* Maintain a consistent product image aspect ratio */}
                <AspectRatio ratio={1 / 1.3}>
                    <img
                        src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85"
                        alt=""
                        loading="lazy"
                        className="size-full object-cover rounded-2xl"
                    />
                </AspectRatio>

                {/* Product information */}
                <div className="mt-2">
                    <h3 className="text-sm font-semibold">کفش دربی چرمی</h3>

                    {/* Product price */}
                    <p className="text-xs text-muted-foreground">
                        {formatPersianNumber(180000)} <span>تومان</span>
                    </p>
                </div>
            </Link>
        </article>
    );
};

export default SearchProductCard;
