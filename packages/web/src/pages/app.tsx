import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
} from "@tanstack/react-router";
import { useAnalytics } from "@/src/lib/hooks/use-analytics";
import HomePage from "@/src/pages/home";
import _404 from "./404";

const rootRoute = createRootRoute({
	component: () => {
		useAnalytics();
		return <Outlet />;
	},
	notFoundComponent: () => <_404 />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: function Index() {
		return <HomePage />;
	},
});

const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({
	routeTree,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default router;
