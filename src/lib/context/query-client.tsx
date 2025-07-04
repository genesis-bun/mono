import { QueryClient, QueryClientProvider as QueryClientProviderBase } from "@tanstack/react-query";
import { toast } from "sonner";

// Tanstack Query
const queryClient = new QueryClient();
queryClient.defaultMutationOptions({
  onError: ({ error }) => toast(error),
});

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
    return <QueryClientProviderBase client={queryClient}>{children}</QueryClientProviderBase>
}