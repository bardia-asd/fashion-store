import { useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/authSelectors";
import ProfileSidebar from "./components/ProfileSidebar";
import { Outlet } from "react-router";

const Profile = () => {
    // Get the currently authenticated user from Redux
    const user = useSelector(selectAuthUser);

    return (
        // Main profile page container
        <div className="container-app my-8">
            {/* Profile welcome message and introduction */}
            <div>
                <span className="font-semibold text-[10px] text-muted-foreground">
                    حساب کاربری
                </span>

                {/* Personalized greeting */}
                <h1 className="text-4xl mt-4">
                    سلام، {user?.user_metadata.name}
                </h1>

                {/* Brief description of account features */}
                <p className="text-sm text-muted-foreground mt-2.5">
                    اطلاعات حساب و سفارش‌های خود را مدیریت کنید.
                </p>
            </div>

            {/* Profile sidebar and nested account pages */}
            <div className="grid grid-cols-3 gap-7 mt-11">
                {/* Account navigation sidebar */}
                <ProfileSidebar />

                {/* Render the active nested profile route */}
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;
