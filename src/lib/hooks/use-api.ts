import { useMutation } from "@tanstack/react-query";
import client from "../utils/api-client";
import { toast } from "sonner";

export function useApi() {
    return {
        welcome: useMutation({
            mutationFn: async (name: string) => {
                const result = await client.example.index.$get({
                    query: {
                        name,
                    },
                })

                const parsed = await result.json();

                if (!parsed.success) {
                    throw new Error(parsed.error);
                }

                return parsed.data;
            },
            onSuccess: (res) => {
                toast.success(`Success: ${res.name}`);
            },
            onError: (err) => {
                console.error(err);
                toast.error("Failed to fetch data");
            }
        }),
    }
}