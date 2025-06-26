import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "./lib/context/theme-provider";
import { ErrorBoundary } from "./lib/components/errors/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./pages/app";
import { toast, Toaster } from "sonner";
import "../styles/globals.css";
import { RouterProvider } from "@tanstack/react-router";

// Tanstack Query
const queryClient = new QueryClient();
queryClient.defaultMutationOptions({
  onError: ({ error }) => toast(error),
});

// Root element
const rootElement = document.getElementById("root")!;
if (!rootElement) throw new Error("Failed to find the root element");

// App
const app = (
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <RouterProvider router={router} />
          <Toaster position="bottom-right" theme="dark" />
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