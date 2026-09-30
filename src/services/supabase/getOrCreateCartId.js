import { supabase } from "./client";

export const getOrCreateCartId = async (userId) => {
    let { data: existingCart, error: fetchError } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (fetchError) throw fetchError;

    if (existingCart) return existingCart.id;

    const { data: newCart, error: insertError } = await supabase
        .from("carts")
        .insert([{ user_id: userId }])
        .select("id")
        .select();

    if (insertError) throw insertError;

    return newCart;
};
