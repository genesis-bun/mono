import type { User } from "@/api/lib/db/schema/users";
import { Badge } from "@/src/lib/components/ui/badge";
import { Button } from "@/src/lib/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/src/lib/components/ui/card";
import { TextShimmer } from "@/src/lib/components/ui/text-shimmer";
import { useUserStore } from "@/src/lib/hooks/use-store";

interface UserCardProps {
	user: User;
}

export function UserCard({ user }: UserCardProps) {
	const { setUser } = useUserStore();
	return (
		<Card className="w-full bg-input shadow-md backdrop-blur">
			<CardContent className="flex flex-row items-center gap-4 p-4">
				<div className="flex flex-col items-start gap-1">
					<CardTitle className="text-base sm:text-lg flex items-center gap-2">
						<span>{user.name || "Welcome"}</span>
						<Badge
							variant="outline"
							className="text-[10px] uppercase tracking-wide bg-background/60"
						>
							<Button
								unstyled
								onClick={() => {
									setUser(undefined);
								}}
							>
								Sign Out
							</Button>
						</Badge>
					</CardTitle>
					{user.slug && (
						<CardDescription className="text-xs sm:text-sm">
							<TextShimmer as="span">{`@${user.slug}`}</TextShimmer>
						</CardDescription>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
