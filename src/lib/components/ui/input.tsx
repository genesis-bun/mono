import { motion } from "motion/react";
import type * as React from "react";
import Icon from "@/src/lib/components/custom/Icon";
import { Button } from "@/src/lib/components/ui/button";
import { cn } from "@/src/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
	withSubmitIcon?: boolean;
	onSubmit?: () => void;
}

function Input({
	className,
	type,
	withSubmitIcon = false,
	onSubmit,
	disabled,
	value,
	...props
}: InputProps) {
	const hasValue = value && String(value).trim().length > 0;

	return (
		<div className="relative">
			<input
				type={type}
				data-slot="input"
				disabled={disabled}
				value={value}
				className={cn(
					"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					withSubmitIcon && "pr-12",
					className,
				)}
				{...props}
			/>
			{withSubmitIcon && (
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{
						opacity: hasValue ? 1 : 0,
						x: hasValue ? 0 : 20,
					}}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="absolute right-1 top-1/2 -translate-y-1/2"
				>
					<Button
						onClick={onSubmit}
						disabled={disabled || !hasValue}
						variant="ghost"
						size="sm"
						className="h-7 w-7 p-0 hover:bg-primary/10"
					>
						<Icon name="ArrowRight" className="h-4 w-4" />
					</Button>
				</motion.div>
			)}
		</div>
	);
}

export { Input };
