import logo from "@assets/icons/logo.svg";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import Layout from "./layout";

export default function NotFoundPage() {
	return (
		<Layout>
			<div className="min-h-screen flex flex-col items-center justify-center p-8">
				<motion.div
					className="flex flex-col items-center text-center gap-6 max-w-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
				>
					<div className="space-y-4">
						<img
							src={logo}
							alt="Logo"
							className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 drop-shadow-md object-contain mx-auto mb-4"
						/>
						<p className="text-xs uppercase tracking-[0.17em] text-muted-foreground/80">
							Oops, page not found
						</p>
						<p className="text-lg md:text-xl text-muted-foreground">
							The page you&apos;re looking for has hopped away or never existed.
						</p>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-3 mt-2">
						<Button asChild variant="default" size="lg" className="px-6">
							<Link to="/">Back to home</Link>
						</Button>
					</div>
				</motion.div>
			</div>
		</Layout>
	);
}
