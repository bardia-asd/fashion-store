import { Outlet } from "react-router";
import Header from "../Header";
import BottomNavigation from "../BottomNavigation";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-dvh">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <BottomNavigation />
        </div>
    );
};

export default RootLayout;
