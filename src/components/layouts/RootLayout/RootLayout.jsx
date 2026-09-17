import { Outlet } from "react-router";
import Header from "../Header";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-dvh">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
