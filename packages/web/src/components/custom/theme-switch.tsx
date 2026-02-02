import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useTheme } from "src/lib/context/theme-provider";
import { Button } from "../ui/button";

export default function ThemeSwitch() {
	const { theme, setTheme } = useTheme();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			whileHover={{ scale: 1.1 }}
			transition={{
				scale: { type: "spring", visualDuration: 0.2, bounce: 0.5 },
			}}
		>
			<Button
				variant="default"
				size="icon"
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			>
				<div className="rotate-0 transition-all dark:-rotate-90">
					{theme === "dark" ? <MoonStarsIcon /> : <SunIcon />}
				</div>
				<span className="sr-only">Toggle theme</span>
			</Button>
		</motion.div>
	);
}
