import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useGetBestSellerProductsQuery } from "@/features/products/productsApi";

import { Button } from "@/components/ui/button";

import ProductsCard, {
    ProductCardSkeleton,
} from "@/components/product/ProductsCard";
import SectionHeader from "./SectionHeader";

const BestSellerProducts = () => {
    // Store a reference to the Swiper instance for external controls
    const swiperRef = useRef(null);

    // Fetch the best-selling products
    const { data: bestSellerProducts, isLoading } =
        useGetBestSellerProductsQuery();

    return (
        // Best-selling products section
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
            <div className="container-app">
                {/* Section title and slider navigation controls */}
                <SectionHeader
                    eyebrow="محبوب مشتریان"
                    title="پرفروش‌ترین‌ها"
                    direction="row"
                    actions={
                        <>
                            <Button
                                size="icon"
                                variant="outline"
                                aria-label="محصولات قبلی"
                                className="size-10 rounded-full bg-transparent! hover:text-primary-foreground"
                                onClick={() => swiperRef.current?.slidePrev()}>
                                <ChevronRight />
                            </Button>

                            <Button
                                size="icon"
                                variant="outline"
                                aria-label="محصولات بعدی"
                                className="size-10 rounded-full bg-transparent! hover:text-primary-foreground"
                                onClick={() => swiperRef.current?.slideNext()}>
                                <ChevronLeft />
                            </Button>
                        </>
                    }
                />

                {/* Responsive best-selling products slider */}
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    spaceBetween={16}
                    slidesPerView={1.4}
                    breakpoints={{
                        425: {
                            slidesPerView: 2.4,
                        },
                        768: {
                            slidesPerView: 3.2,
                        },
                        1024: {
                            slidesPerView: 4.4,
                        },
                    }}
                    className="mySwiper">
                    {/* Show skeleton slides while products are loading */}
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, i) => (
                              <SwiperSlide key={i}>
                                  <ProductCardSkeleton />
                              </SwiperSlide>
                          ))
                        : bestSellerProducts.map((product) => (
                              // Render each best-selling product
                              <SwiperSlide key={product.id}>
                                  <ProductsCard product={product} />
                              </SwiperSlide>
                          ))}
                </Swiper>
            </div>
        </section>
    );
};

export default BestSellerProducts;
