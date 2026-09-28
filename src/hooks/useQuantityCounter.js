import { useState } from "react";

export const useQuantityCounter = ({
    initialVariant = 1,
    min = 1,
    max = Infinity,
}) => {
    const [quantity, setQuantity] = useState(initialVariant);

    const increment = () => setQuantity((q) => Math.min(q + 1, max));
    const decrement = () => setQuantity((q) => Math.max(q - 1, min));

    return { quantity, increment, decrement, setQuantity };
};
