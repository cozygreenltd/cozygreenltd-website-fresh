// Application entry point that mounts the React tree and global providers.
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/App";
import { ErrorBoundary } from "@/components/error-boundary";
import { NavigationProvider } from "@/lib/navigation";
import "@/styles.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
