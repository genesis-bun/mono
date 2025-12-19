import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import client from "../utils/api-client";

export function useApi() {
	return {
		welcome: useMutation({
			mutationFn: async (name: string) => {
				const result = await client.welcome.index.$post({
					json: {
						name,
					},
				});

				const parsed = await result.json();

				if (!parsed.success) {
					throw new Error(parsed.error);
				}

				toast.success(`${parsed.message}`);
				return parsed.data;
			},
			onError: (err) => {
				console.error(err);
				toast.error(err.message);
			},
		}),
	};
}
