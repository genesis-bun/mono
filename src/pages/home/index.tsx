import logo from "@assets/icons/logo.svg";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Input } from "@/src/lib/components/ui/input";
import { useApi } from "@/src/lib/hooks/use-api";
import { useUserStore } from "@/src/lib/hooks/use-store";
import Layout from "../layout";
import { UserCard } from "./user-card";

export default function Home() {
	const { welcome } = useApi();
	const { user } = useUserStore();
	const [message, setMessage] = useState("");

	return (
		<Layout>
			<div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-background to-muted">
				<motion.div
					className="flex flex-col items-center justify-center text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
				>
					<div className="relative mb-6">
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
							<motion.img
								src={logo}
								alt="Bun Logo"
								className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 drop-shadow-md object-contain"
							/>
						</motion.div>

						{/* Subtle glow effect */}
						<motion.div
							className="absolute inset-0 bg-linear-to-r from-chart-1/20 via-chart-2/20 to-chart-3/20 rounded-full blur-xl scale-110"
							animate={{ opacity: [0.4, 0.8, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
					</div>

					{/* Fancy Input Box */}
					<motion.div
						layout
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
					>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 font-manrope"
							transition={{ duration: 0.15 }}
						>
							Hey, There!
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.5 }}
						>
							Your new app is ready to go!
						</motion.p>
						<AnimatePresence mode="wait">
							{!user ? (
								<motion.div
									layout
									key="input-box"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -30 }}
									transition={{ duration: 0.2, ease: "easeOut" }}
									className="mt-6"
								>
									<Input
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter" && message.trim()) {
												welcome.mutate(message.trim());
												setMessage("");
											}
										}}
										onSubmit={() => {
											if (message.trim()) {
												welcome.mutate(message.trim());
												setMessage("");
											}
										}}
										disabled={welcome.isPending}
										placeholder="Enter your name.."
										className="max-w-md mx-auto"
										withSubmitIcon
									/>
								</motion.div>
							) : (
								<motion.div
									layout
									key="user-card"
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -50 }}
									transition={{ duration: 0.25, ease: "easeOut" }}
									className="mt-8"
								>
									<UserCard user={user} />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.div>
			</div>
		</Layout>
	);
}
