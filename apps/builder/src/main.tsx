import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Import shared components to register question types
import "@survey/shared";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
