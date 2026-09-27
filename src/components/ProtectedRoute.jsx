import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "@/features/auth/authSelectors";
import BrandLoader from "./common/BrandLoader";

const ProtectedRoute = ({ children }) => {
    const status = useSelector(selectAuthStatus);
    const location = useLocation();

    if (status === "loading") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
                <BrandLoader />
            </div>
        );
    }

    if (status !== "authenticated")
        return (
            <Navigate
                to="/signin"
                state={{ from: location.pathname }}
                replace
            />
        );

    return children;
};

export default ProtectedRoute;
