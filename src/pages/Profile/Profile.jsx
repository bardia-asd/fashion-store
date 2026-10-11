import { useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/authSelectors";
import ProfileSidebar from "./components/ProfileSidebar";
import { Outlet } from "react-router";

const Profile = () => {
    // Get the currently authenticated user from Redux
    const user = useSelector(selectAuthUser);

    return (
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
            <div className="mt-7 grid grid-cols-1 gap-5 sm:mt-9 sm:gap-6 lg:mt-11 lg:grid-cols-3 lg:gap-7">
                {/* Account navigation sidebar */}
                <div className="lg:col-span-1">
                    <ProfileSidebar />
                </div>

                {/* Render the active nested profile route */}
                <div className="lg:col-span-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Profile;
