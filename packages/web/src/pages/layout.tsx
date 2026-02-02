import ThemeSwitch from "@/src/components/custom/theme-switch";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-background">
			<div className="@container/main">{children}</div>

			<div className="fixed right-4 bottom-4">
				<ThemeSwitch />
			</div>
		</div>
	);
}
