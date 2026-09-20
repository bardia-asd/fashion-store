import { useRef, useState } from "react";
import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { cn } from "cn";

const ProductGallery = ({ gallery }) => {
    // Track the currently selected gallery image
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    return (
        // Product image gallery with thumbnails
        <div className="flex flex-col gap-3 min-w-0">
            {/* Main product image carousel */}
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="w-full rounded-3xl overflow-hidden cursor-pointer">
                {/* Render each gallery image as a slide */}
                {gallery.map((image) => (
                    <SwiperSlide key={image.id}>
                        {/* Maintain a consistent product image aspect ratio */}
                        <AspectRatio ratio={4 / 5}>
                            <img
                                src={image.url}
                                alt="تصویر محصول"
                                loading="lazy"
                                className="absolute inset-0 size-full object-cover"
                            />
                        </AspectRatio>
                    </SwiperSlide>
                ))}
            </Swiper>

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
