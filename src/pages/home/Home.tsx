import { Button } from "@/src/lib/components/ui/button";
import { useStorePersist } from "@/src/lib/hooks/use-store";
import { motion } from "motion/react"
import { cn } from "@/src/lib/utils";
import { useApi } from "@/src/lib/hooks/use-api";
import Upload from "@/src/lib/components/custom/Upload";

export default function HomePage() {
    const { bears, setBears } = useStorePersist();
    const api = useApi();
    const { mutate, status, error } = api.welcome;

    return (
        <div
            className="h-full flex flex-col items-center justify-center"
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
                onClick={() => { setBears(bears + 1); mutate("Genesis"); }}
            />

            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                className={cn(
                    "mt-14 font-mono text-4xl font-bold tracking-widest text-amber-600",
                    status === "success" && "text-green-500",
                    error && "text-red-500"
                )}
            >
                {bears}
            </motion.div>

            <Button
                variant="secondary"
                onClick={() => setBears(0)}
                className="mt-4"
            >
                Reset
            </Button>
        </div>
    )
}