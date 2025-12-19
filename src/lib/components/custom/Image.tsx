import { cn } from "@/src/lib/utils";

type Props = {
	src?: string | null;
	alt?: string | null;
	className?: string;
} & React.HTMLAttributes<HTMLImageElement>;

export function Image({ src, alt, className, ...props }: Props) {
	return (
		<img
			src={src ?? "/placeholder.webp"}
			alt={alt || "default"}
			className={cn(className)}
			{...props}
			onError={(e) => {
				e.currentTarget.src = "/placeholder.webp";
			}}
		/>
	);
}
