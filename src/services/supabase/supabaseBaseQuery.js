import { supabase } from "./client";

const applyFilters = (builder, filters = []) =>
    filters.reduce(
        (acc, { column, operator, value }) =>
            acc.filter(column, operator, value),
        builder,
    );

export const supabaseBaseQuery =
    () =>
    async ({ table, method, ...args }) => {
        try {
            let query = supabase.from(table);

            if (method === "select") {
                let builder = query.select(args.query ?? "*");

                if (args.match) builder = builder.match(args.match);
                builder = applyFilters(builder, args.filters);

                if (args.orderBy) {
                    builder = builder.order(args.orderBy.column, {
                        ascending: args.orderBy.ascending ?? true,
                    });
                }
                if (args.limit) builder = builder.limit(args.limit);

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
                let builder = query.update(args.values);
                builder = args.match
                    ? builder.match(args.match)
                    : applyFilters(builder, args.filters);
                const { data, error } = await builder.select();
                if (error) throw error;
                return { data };
            }
            if (method === "delete") {
                let builder = query.delete();
                builder = args.match
                    ? builder.match(args.match)
                    : applyFilters(builder, args.filters);
                const { data, error } = await builder;
                if (error) throw error;
                return { data };
            }

            throw new Error(`Unsupported method: ${method}`);
        } catch (error) {
            return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
    };
