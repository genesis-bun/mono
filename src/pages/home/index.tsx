import { motion } from "motion/react";
import { Button } from "@/src/lib/components/ui/button";
import { useApi } from "@/src/lib/hooks/use-api";
import { Image } from "../../lib/components/custom/Image";
import Layout from "../layout";

export default function Home() {
	const { welcome } = useApi();
	return (
		<Layout>
			<div className="min-h-full flex flex-col items-center justify-center bg-linear-to-br from-background to-muted/20 p-4">
				<motion.div
					className="flex flex-col items-center justify-center text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
				>
					<div className="relative mb-6">
						{/* Animated logo container */}
						<motion.div
							animate={{
								y: [-15, 0, -15],
							}}
							transition={{
								duration: 2,
								ease: "easeInOut",
								repeat: Infinity,
								times: [0, 0.5, 1],
							}}
						>
							<Image
								src="/static/logo.svg"
								alt="Bun Logo"
								className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 drop-shadow-lg"
							/>
						</motion.div>

						{/* Subtle glow effect */}
						<motion.div
							className="absolute inset-0 bg-linear-to-r from-chart-1/20 via-chart-2/20 to-chart-3/20 rounded-full blur-xl scale-110"
							animate={{ opacity: [0.4, 0.8, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
					</div>

					{/* Welcome text with fade-in animation */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
					>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4"
							transition={{ duration: 0.15 }}
						>
							Welcome
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.5 }}
						>
							Your new site is ready to hop into action
						</motion.p>
						<motion.div
							onClick={() => welcome.mutate("World")}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2, delay: 0.5 }}
							className="mt-6"
						>
							<Button disabled={welcome.isPending} variant="primary" size="lg">
								Say Hello
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</Layout>
	);
}
