import CategoriesSection from "./components/CategoriesSection";
import HeroSection from "./components/HeroSection";
import NewArrivalProducts from "./components/NewArrivalProducts";
import PromoSection from "./components/PromoSection";
import TrendingProducts from "./components/TrendingProducts";

const Home = () => {
    return (
        <>
            <HeroSection />

            <CategoriesSection />

            <NewArrivalProducts />

            <PromoSection />

            <TrendingProducts />
        </>
    );
};

export default Home;
