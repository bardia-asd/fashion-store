import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { DirectionProvider } from "@base-ui/react";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <DirectionProvider direction="rtl">
                <App />
            </DirectionProvider>
        </Provider>
    </StrictMode>,
);
