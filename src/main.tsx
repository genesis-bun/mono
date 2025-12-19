import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { ErrorBoundary } from "./lib/components/custom/ErrorBoundary";
import { QueryClientProvider } from "./lib/context/query-client";
import { ThemeProvider } from "./lib/context/theme-provider";
import router from "./pages/app";
import "./globals.css";

// Root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// App
const app = (
	<StrictMode>
		<ErrorBoundary>
			<QueryClientProvider>
				<ThemeProvider defaultTheme="dark" storageKey="theme">
					<RouterProvider router={router} />
					<Toaster position="bottom-left" />
				</ThemeProvider>
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>
);

// Hot module replacement
if (import.meta.hot) {
	let root = import.meta.hot.data.root;
	if (!root) {
		root = import.meta.hot.data.root = createRoot(rootElement);
	}
	root.render(app);
} else {
	createRoot(rootElement).render(app);
}
