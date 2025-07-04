import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "./lib/context/theme-provider";
import { ErrorBoundary } from "./lib/components/errors/ErrorBoundary";
import { QueryClientProvider } from "./lib/context/query-client";
import router from "./pages/app";
import { Toaster } from "sonner";
import { RouterProvider } from "@tanstack/react-router";
import "./globals.css";

// Root element
const rootElement = document.getElementById("root")!;
if (!rootElement) throw new Error("Failed to find the root element");

// App
const app = (
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <RouterProvider router={router} />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);

// Hot module replacement
if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= createRoot(rootElement));
  root.render(app);
} else {
  createRoot(rootElement).render(app);
}