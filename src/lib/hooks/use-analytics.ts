import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const GA_MEASUREMENT_ID = "<your-ga-id-goes-here>";

export function useAnalytics() {
  const location = useRouterState({ select: (s) => s.location });

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}