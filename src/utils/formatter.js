export const formatPersianNumber = (value) => {
    return new Intl.NumberFormat("fa-IR").format(value);
};
