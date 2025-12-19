import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
} from "@tanstack/react-router";
import { withPageErrorBoundary } from "@/src/lib/components/custom/PageErrorBoundary";
import { useAnalytics } from "@/src/lib/hooks/use-analytics";
import HomePage from "@/src/pages/home";

const rootRoute = createRootRoute({
	component: () => {
		useAnalytics();

		return <Outlet />;
	},
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: function Index() {
		return withPageErrorBoundary(HomePage)({});
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
