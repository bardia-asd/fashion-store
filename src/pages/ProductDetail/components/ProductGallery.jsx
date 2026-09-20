import { useState } from "react";
import PropTypes from "prop-types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "cn";

const ProductGallery = ({ gallery }) => {
    // Track the currently selected gallery image
    const [activeIndex, setActiveIndex] = useState(0);

    // Get the currently selected image
    const activeImg = gallery[activeIndex];

    return (
        // Product image gallery with thumbnails
        <div className="flex flex-col gap-3 min-w-0">
            {/* Main product image */}
            <AspectRatio ratio={4 / 5}>
                <img
                    src={activeImg.url}
                    alt="تصویر محصول"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover rounded-3xl"
                />
            </AspectRatio>

            {/* Gallery thumbnails */}
            <div className="flex items-center gap-2">
                {gallery.map((image, i) => (
                    <button
                        key={image.id}
                        onClick={() => setActiveIndex(i)}
                        className={cn(
                            "flex-1 rounded-2xl overflow-hidden",
                            i === activeIndex && "ring-2 ring-primary",
                        )}>
                        {/* Thumbnail image */}
                        <AspectRatio ratio={1 / 1}>
                            <img
                                src={image.url}
                                alt={`تصویر ${i + 1} محصول`}
                                className="size-full object-cover"
                            />
                        </AspectRatio>
                    </button>
                ))}
            </div>
        </div>
    );
};

ProductGallery.propTypes = {
    gallery: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default ProductGallery;
