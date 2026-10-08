import { Outlet } from "react-router";
import CheckoutStepper from "./components/CheckoutStepper";
import CheckoutSummary from "./components/CheckoutSummary";

const Checkout = () => {
    return (
        <div className="container-app my-8">
            <CheckoutStepper />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                <div className="lg:col-span-2">
                    <Outlet />
                </div>

                <CheckoutSummary />
            </div>
        </div>
    );
};

export default Checkout;
