import { Button } from "@/src/lib/components/ui/button";
import { useStorePersist } from "@/src/lib/hooks/use-store";
import { motion } from "motion/react"
import client from "@/src/lib/utils/api-client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/src/lib/utils";

export default function HomePage() {
    const { bears, setBears } = useStorePersist();
    const { mutate, status, error } = useMutation({
        mutationFn: () => {
            return client.example.index.$get({
                query: {
                    name: "Genesis",
                },
            })
        },
        onSuccess: async (res) => {
            const parsed = await res.json();

            if (!parsed.success) {
                throw new Error(parsed.error);
            }

            toast.success(`Response: ${parsed.data.name}`);
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to fetch data");
        }
    });

    return (
        <div
            className="flex flex-col items-center justify-center h-full gap-10"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.1 }}
                transition={{
                    scale: { type: "spring", visualDuration: 0.2, bounce: 0.5 },
                }}
                className={cn(
                    "rounded-full @lg/main:size-100 size-50 object-cover bg-amber-500",
                    status === "success" && "bg-green-500",
                    error && "bg-red-500",
                )}
                onClick={() => { setBears(bears + 1); mutate(); }}
            />

            <h1 className="text-4xl font-bold">Hello World!</h1>

            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                className={cn(
                    "mt-10 font-mono text-4xl font-bold tracking-widest text-amber-600",
                    status === "success" && "text-green-500",
                    error && "text-red-500"
                )}
            >
                {bears}
            </motion.div>

            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    onClick={() => setBears(0)}
                >
                    Reset
                </Button>
            </div>
        </div>
    )
}