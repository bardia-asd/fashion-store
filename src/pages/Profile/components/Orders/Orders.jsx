import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectAuthUser } from "@/features/auth/authSelectors";
import { useGetOrdersQuery } from "@/features/orders/ordersApi";
import OrderCard from "./OrderCard";
import BrandLoader from "@/components/common/BrandLoader";
import OrdersEmptyState from "./OrdersEmptyState";

const ProfileOrders = () => {
    const user = useSelector(selectAuthUser);

    const { data: orders, isLoading } = useGetOrdersQuery(user.id, {
        skip: !user.id,
    });

    return (
        <Card className="px-4">
            <CardHeader className="border-b px-0 mb-6">
                <span className="font-semibold text-[10px] text-muted-foreground">
                    سفارش‌های من
                </span>

                <CardTitle className="text-2xl font-normal">
                    سفارش‌های من
                </CardTitle>
            </CardHeader>

            <CardContent className="px-0">
                {isLoading ? (
                    <BrandLoader size="sm" />
                ) : orders?.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <OrdersEmptyState />
                )}
            </CardContent>
        </Card>
    );
};

export default ProfileOrders;
