import Icon from "../custom/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
	return (
		<nav className="fixed top-0 gap-2 h-(--navbar-height) w-full z-50 border-b bg-background flex items-center justify-between px-4">
			{/* top left */}
			<div className="flex gap-2 items-center">
				<span className="text-2xl font-semibold">Genesis</span>
			</div>

			<Avatar className="bg-muted rounded-full p-2">
				<AvatarImage src="/static/logo.svg" alt="Genesis" />
				<AvatarFallback>
					<Icon name="User" className="size-4" />
				</AvatarFallback>
			</Avatar>
		</nav>
	);
}
