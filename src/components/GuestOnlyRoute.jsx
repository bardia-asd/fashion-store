import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/features/auth/authSelectors";
import BrandLoader from "./common/BrandLoader";

const GuestOnlyRoute = ({ children }) => {
    const status = useSelector(selectAuthStatus);

    if (status === "loading") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
                <BrandLoader />
            </div>
        );
    }

    if (status === "authenticated") return <Navigate to="/" replace />;

    return children;
};

export default GuestOnlyRoute;
