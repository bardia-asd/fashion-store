// src/services/supabase/supabaseBaseQuery.js
import { supabase } from "./client";

export const supabaseBaseQuery =
    () =>
    async ({ table, method, ...args }) => {
        try {
            let query = supabase.from(table);

            if (method === "select") {
                const { data, error } = await query
                    .select(args.query ?? "*")
                    .match(args.match ?? {});
                if (error) throw error;
                return { data };
            }
            if (method === "insert") {
                const { data, error } = await query
                    .insert(args.values)
                    .select();
                if (error) throw error;
                return { data };
            }
            if (method === "update") {
                const { data, error } = await query
                    .update(args.values)
                    .match(args.match)
                    .select();
                if (error) throw error;
                return { data };
            }
            if (method === "delete") {
                const { data, error } = await query.delete().match(args.match);
                if (error) throw error;
                return { data };
            }

            throw new Error(`Unsupported method: ${method}`);
        } catch (error) {
            return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
    };
