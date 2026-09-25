export const formatPersianNumber = (value) => {
    return new Intl.NumberFormat("fa-IR").format(value).replace("٫", ".");
};

export const toPlainNumber = (str) => {
    const persianToLatin = str.replace(/[۰-۹]/g, (d) =>
        "۰۱۲۳۴۵۶۷۸۹".indexOf(d),
    );
    return persianToLatin.replace(/[^\d]/g, ""); // strip commas etc.
};

export const formatReviewDate = (date) => {
    if (!date) return "";

    const articleDate = new Date(date);

    if (Number.isNaN(articleDate.getTime())) return "";

    const now = new Date();

    const diffInSeconds = Math.floor((now - articleDate) / 1000);

    if (diffInSeconds < 60) return "همین الان";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
        return `${formatPersianNumber(diffInMinutes)} دقیقه پیش`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${formatPersianNumber(diffInHours)} ساعت پیش`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${formatPersianNumber(diffInDays)} روز پیش`;

    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(articleDate);
};
