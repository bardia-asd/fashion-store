export const getOrderStatus = (status) => {
    const statuses = {
        pending: {
            label: "در انتظار تأیید",
            className: "bg-yellow-50 text-yellow-700",
        },
        processing: {
            label: "در حال پردازش",
            className: "bg-orange-50 text-orange-700",
        },
        shipped: {
            label: "ارسال شده",
            className: "bg-teal-50 text-teal-700",
        },
        delivered: {
            label: "تحویل داده شده",
            className: "bg-success/10 text-success",
        },
        cancelled: {
            label: "لغو شده",
            className: "bg-destructive/10 text-destructive",
        },
    };

    return (
        statuses[status] ?? {
            label: "نامشخص",
            className: "bg-muted text-muted-foreground",
        }
    );
};
