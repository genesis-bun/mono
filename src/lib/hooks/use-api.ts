import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import client from "../utils/api-client";
import { useUserStore } from "./use-store";

export function useApi() {
	const { setUser } = useUserStore();
	return {
		welcome: useMutation({
			mutationFn: async (name: string) => {
				const res = await client.welcome.index.$post({
					json: {
						name,
					},
				});

				const parsed = await res.json();

				if (!parsed.success) {
					throw new Error(parsed.error);
				}

				toast.success(`${parsed.message}`);
				return parsed.data;
			},
			onSuccess: (data) => {
				const user = {
					...data,
					createdAt: new Date(data.createdAt),
					updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
					deletedAt: data.deletedAt ? new Date(data.deletedAt) : null,
				};

				setUser(user);
			},
			onError: (err) => {
				console.error(err);
				toast.error(err.message);
			},
		}),
	};
}
