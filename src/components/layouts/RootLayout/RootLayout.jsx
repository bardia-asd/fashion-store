import { Outlet } from "react-router";
import Header from "../Header";
import BottomNavigation from "../BottomNavigation";
import Footer from "../Footer";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-dvh pb-14 md:pb-0">
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
