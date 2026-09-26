import { Link } from "react-router";
import RegisterForm from "./components/RegisterForm";

const Register = () => {
    return (
        // Register page container
        <div className="max-w-96 w-full m-auto">
            {/* Register heading and description */}
            <div className="mb-8">
                {/* Page title */}
                <h2 className="mb-3 text-3xl font-bold">به DBY بپیوندید</h2>

                {/* Register description */}
                <p className="text-sm text-muted-foreground">
                    به جمع ما بپیوندید و تجربه‌ای متفاوت از خرید داشته باشید.
                </p>
            </div>

            {/* Register form */}
            <RegisterForm />

            {/* Link to the login page */}
            <p className="text-center text-xs text-black/50 mt-6">
                قبلاً حساب ساخته‌اید؟
                <Link
                    to="/signin"
                    className="text-foreground underline font-semibold">
                    ورود به حساب
                </Link>
            </p>
        </div>
    );
};

export default Register;
