import PropTypes from "prop-types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { formatPersianDate, formatPersianNumber } from "@/utils/formatter";
import { getOrderStatus } from "@/utils/orderStatus";
import { cn } from "cn";

const OrderCard = ({ order }) => {
    // Get the display label and styling for the order status
    const { label, className } = getOrderStatus(order.status);

    // Calculate the total quantity of items in the order
    const totalItems = order.order_items.reduce(
        (sum, item) => sum + item.quantity,
        0,
    );

    return (
        // Order card container
        <div className="min-w-0 border p-3 sm:p-5">
            {/* Order header */}
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    {/* Order number label */}
                    <span className="text-[10px] font-semibold text-muted-foreground">
                        شماره سفارش
                    </span>

                    {/* Formatted order number */}
                    <p className="m-0 mt-2 break-all text-sm font-semibold">
                        DBY-{order.order_number}
                    </p>
                </div>

                {/* Current order status badge */}
                <span
                    className={cn(
                        "shrink-0 rounded-xs px-2.5 py-1.5 text-[10px]",
                        className,
                    )}>
                    {label}
                </span>
            </div>

            {/* Order date, products, and total price */}
            <div className="my-3.5 grid grid-cols-1 gap-3 border-y py-3.5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
                {/* Order creation date */}
                <span className="text-[10px] font-semibold text-muted-foreground">
                    {formatPersianDate(order.created_at)}
                </span>

                {/* List the ordered products and their quantities */}
                <div className="min-w-0 sm:text-center text-xs text-muted-foreground">
                    {order.order_items.map((item, index) => (
                        <span key={item.id}>
                            {item.product?.name_fa} ×{" "}
                            {formatPersianNumber(item.quantity)}
                            {index < order.order_items.length - 1 && "، "}
                        </span>
                    ))}
                </div>

                {/* Total order price */}
                <p className="m-0 text-sm font-semibold sm:text-left">
                    {formatPersianNumber(order.total)}
                    <span className="mr-1 text-[10px] font-normal">تومان</span>
                </p>
            </div>

            {/* Expandable order details */}
            <Accordion>
                <AccordionItem>
                    <AccordionTrigger className="text-xs">
                        مشاهده جزئیات سفارش
                    </AccordionTrigger>

                    <AccordionContent>
                        {/* Payment method, delivery method, and total item count */}
                        <div className="grid grid-cols-2 gap-4 rounded-xs bg-muted p-3.5 sm:grid-cols-3">
                            <div className="min-w-0">
                                <span className="text-[10px] font-semibold text-muted-foreground">
                                    روش پرداخت
                                </span>

                                {/* Display the selected payment method */}
                                <p className="m-0 mt-1.5 text-xs font-semibold">
                                    {order.payment_method === "online"
                                        ? "پرداخت آنلاین"
                                        : "پرداخت در محل"}
                                </p>
                            </div>

                            <div className="min-w-0">
                                <span className="text-[10px] font-semibold text-muted-foreground">
                                    روش ارسال
                                </span>

                                {/* Display the selected delivery method */}
                                <p className="m-0 mt-1.5 text-xs font-semibold">
                                    {order.delivery_method === "standard"
                                        ? "ارسال استاندارد"
                                        : "ارسال سریع"}
                                </p>
                            </div>

                            <div className="col-span-2 min-w-0 sm:col-span-1">
                                <span className="text-[10px] font-semibold text-muted-foreground">
                                    تعداد کالا
                                </span>

                                {/* Display the total quantity of ordered items */}
                                <p className="m-0 mt-1.5 text-xs font-semibold">
                                    {formatPersianNumber(totalItems)} کالا
                                </p>
                            </div>
                        </div>

                        {/* Detailed list of order items */}
                        <div className="mt-3 flex flex-col gap-2">
                            {order.order_items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex min-w-0 flex-col gap-2 border px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                    {/* Product name */}
                                    <p className="m-0 min-w-0 wrap-break-word text-xs font-medium text-foreground sm:flex-1 mb-0!">
                                        {item.product?.name_fa}
                                    </p>

                                    {/* Product quantity and selected variant details */}
                                    <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-muted-foreground sm:justify-end">
                                        {/* Ordered quantity */}
                                        <span>
                                            تعداد:{" "}
                                            {formatPersianNumber(item.quantity)}
                                        </span>

                                        {/* Selected product color */}
                                        {item.variant?.color?.name_fa && (
                                            <>
                                                <span>·</span>
                                                <span>
                                                    رنگ:{" "}
                                                    {item.variant.color.name_fa}
                                                </span>
                                            </>
                                        )}

                                        {/* Selected product size */}
                                        {item.variant?.size && (
                                            <>
                                                <span>·</span>
                                                <span>
                                                    سایز: {item.variant.size}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

OrderCard.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        order_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        status: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        payment_method: PropTypes.string,
        delivery_method: PropTypes.string,
        order_items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired,
                product: PropTypes.shape({
                    name_fa: PropTypes.string,
                }),
                variant: PropTypes.shape({
                    size: PropTypes.string,
                    color: PropTypes.shape({
                        name_fa: PropTypes.string,
                    }),
                }),
            }),
        ).isRequired,
    }).isRequired,
};

export default OrderCard;
