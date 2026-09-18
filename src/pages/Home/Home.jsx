import CategoriesSection from "./components/CategoriesSection";
import HeroSection from "./components/HeroSection";
import NewArrivalProducts from "./components/NewArrivalProducts";
import PromoSection from "./components/PromoSection";

const Home = () => {
    return (
        <>
            <HeroSection />

            <CategoriesSection />

            <NewArrivalProducts />

            <PromoSection />
        </>
    );
};

export default Home;
