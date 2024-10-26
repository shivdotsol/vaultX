import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId="160082675243-v1ap67jlkpdjrv40ksfv5rg1l0tu9d8b.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </StrictMode>
);
