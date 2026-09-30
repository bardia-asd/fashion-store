import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";
import Header from "../Header";
import BottomNavigation from "../BottomNavigation";
import Footer from "../Footer";
import { useMergeGuestCart } from "@/hooks/useMergeGuestCart";

const RootLayout = () => {
    useMergeGuestCart();

    return (
        <div className="flex flex-col min-h-dvh pb-14 md:pb-0 scrollbar-thin">
            <ScrollToTop />
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />

            <BottomNavigation />
        </div>
    );
};

export default RootLayout;
