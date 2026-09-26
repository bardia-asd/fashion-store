import { supabase } from "@/services/supabase/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ name, email, password }, { rejectWithValue }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            },
        });

        if (error) return rejectWithValue(error.message);

        return { user: data.user, session: data.session };
    },
);

export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }, { rejectWithValue }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return rejectWithValue(error.message);

        return { user: data.user, session: data.session };
    },
);

export const signOut = createAsyncThunk(
    "auth/signOut",
    async (_, { rejectWithValue }) => {
        const { error } = await supabase.auth.signOut();
        if (error) return rejectWithValue(error.message);
        return null;
    },
);

export const initAuth = createAsyncThunk("auth/init", async () => {
    const { data } = await supabase.auth.getSession();
    return { session: data.session, user: data.session?.user ?? null };
});

const initialState = { name: null, status: "idle", session: null, error: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload;
            state.user = action.payload?.user ?? null;
            state.status = action.payload ? "authenticated" : "unauthenticated";
        },
    },
    extraReducers: (builder) => {
        builder
            // signUp
            .addCase(signUp.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = action.payload.session
                    ? "authenticated"
                    : "idle";
                state.user = action.payload.user;
                state.session = action.payload.session;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
            // signIn
            .addCase(signIn.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = "authenticated";
                state.user = action.payload.user;
                state.session = action.payload.session;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
            // signOut
            .addCase(signOut.fulfilled, (state) => {
                state.status = "unauthenticated";
                state.user = null;
                state.session = null;
            })

            .addCase(initAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.session = action.payload.session;
                state.status = action.payload.session
                    ? "authenticated"
                    : "unauthenticated";
            });
    },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
