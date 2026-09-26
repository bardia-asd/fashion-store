import { Link } from "react-router";
import LoginForm from "./components/LoginForm";

const Login = () => {
    return (
        // Login page container
        <div className="max-w-96 w-full m-auto">
            {/* Login heading and description */}
            <div className="mb-8">
                {/* Page title */}
                <h2 className="mb-3 text-3xl font-bold">ورود به DBY</h2>

                {/* Login description */}
                <p className="text-sm text-muted-foreground">
                    برای ادامه وارد حساب کاربری خود شوید
                </p>
            </div>

            {/* Login form */}
            <LoginForm />

            {/* Link to the signup page */}
            <p className="text-center text-xs text-black/50 mt-6">
                حساب کاربری ندارید؟
                <Link
                    to="/signup"
                    className="text-foreground underline font-semibold">
                    ایجاد حساب
                </Link>
            </p>
        </div>
    );
};

export default Login;
