import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.PUBLIC_GA_ID;

export function useAnalytics() {
	const location = useRouterState({ select: (s) => s.location });

	// Configure GA once on mount
	useEffect(() => {
		if (!window.gtag || !GA_MEASUREMENT_ID) return;

		window.gtag("config", GA_MEASUREMENT_ID);
	}, []);

	useEffect(() => {
		if (!window.gtag || !GA_MEASUREMENT_ID) return;

		window.gtag("event", "page_view", {
			page_path: location.pathname + location.search,
		});
	}, [location]);
}
