import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router/routes";
import { useDispatch } from "react-redux";
import { initAuth, setSession } from "./features/auth/authSlice";
import { supabase } from "./services/supabase/client";
import { Toaster } from "./components/ui/toaster";

const App = () => {
    // Get the Redux dispatch function
    const dispatch = useDispatch();

    useEffect(() => {
        // Restore the current authentication session on app startup
        dispatch(initAuth());

        // Listen for authentication state changes from Supabase
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                // Keep the Redux authentication state in sync with Supabase
                dispatch(setSession(session));
            },
        );

        // Remove the authentication listener when the app unmounts
        return () => listener.subscription.unsubscribe();
    }, [dispatch]);

    return (
        <>
            {/* Provide the application router */}
            <RouterProvider router={router} />
            <Toaster />
        </>
    );
};

export default App;
