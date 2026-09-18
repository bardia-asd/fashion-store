import { supabase } from "./client";

export const supabaseBaseQuery =
    () =>
    async ({ table, method, ...args }) => {
        try {
            let query = supabase.from(table);

            if (method === "select") {
                let builder = query
                    .select(args.query ?? "*")
                    .match(args.match ?? {});

                // ordering: { column: "created_at", ascending: false }
                if (args.orderBy) {
                    builder = builder.order(args.orderBy.column, {
                        ascending: args.orderBy.ascending ?? true,
                    });
                }

                // limit: 10
                if (args.limit) {
                    builder = builder.limit(args.limit);
                }

                const { data, error } = await builder;
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
