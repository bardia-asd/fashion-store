import BestSellerProducts from "./components/BestSellerProducts";
import CategoriesSection from "./components/CategoriesSection";
import HeroSection from "./components/HeroSection";
import LookBookSection from "./components/LookBookSection";
import NewArrivalProducts from "./components/NewArrivalProducts";
import PromoSection from "./components/PromoSection";
import TestimonialSections from "./components/TestimonialSection";
import TrendingProducts from "./components/TrendingProducts";
import TrustGrid from "./components/TrustGrid";

const Home = () => {
    return (
        <>
            <HeroSection />

            <CategoriesSection />

            <NewArrivalProducts />

            <PromoSection />

            <TrendingProducts />

            <LookBookSection />

            <BestSellerProducts />

            <TrustGrid />

            <TestimonialSections />
        </>
    );
};

export default Home;
