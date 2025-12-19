import { useNavigate } from "@tanstack/react-router";
import type React from "react";
import Icon from "@/src/lib/components/custom/Icon";
import ThemeSwitch from "@/src/lib/components/custom/ThemeSwitch";
import { Button } from "@/src/lib/components/ui/button";
import { ErrorBoundary } from "./ErrorBoundary";

interface PageErrorBoundaryProps {
	children: React.ReactNode;
}

const DefaultErrorFallback = () => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-background/95">
			<div className="fixed bottom-4 right-4">
				<ThemeSwitch />
			</div>

			<div className="relative w-full max-w-md p-8 overflow-hidden duration-500 border rounded-lg shadow-md bg-card border-border animate-in fade-in slide-in-from-bottom-4">
				{/* Animated top border */}
				<div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-primary to-transparent" />

				<div className="text-center">
					<div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 duration-300 rounded-full bg-primary/10 text-primary animate-in zoom-in-50">
						<Icon name="CircleAlert" className="w-9 h-9" />
					</div>

					<h2 className="mb-2 text-2xl font-bold duration-300 delay-100 text-foreground animate-in fade-in slide-in-from-bottom-2">
						Something went wrong
					</h2>

					<p className="mb-6 duration-300 delay-150 text-muted-foreground animate-in fade-in slide-in-from-bottom-2">
						There was an error loading this page.
					</p>

					<div className="flex flex-col justify-center gap-3 duration-300 delay-200 sm:flex-row animate-in fade-in slide-in-from-bottom-2">
						<Button
							onClick={() => {
								window.location.reload();
							}}
							variant="default"
						>
							<Icon name="RotateCcw" className="w-4 h-4" />
							Reload Page
						</Button>

						<Button
							onClick={() =>
								navigate({
									to: "/",
								})
							}
							variant="outline"
						>
							<Icon name="House" />
							Go Back
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({ children }) => {
	const handleError = (error: Error) => {
		console.error("Page error:", error);
	};

	return (
		<ErrorBoundary fallback={<DefaultErrorFallback />} onError={handleError}>
			{children}
		</ErrorBoundary>
	);
};

const withPageErrorBoundary =
	<P extends {}>(Component: React.ComponentType<P>) =>
	(props: P) => (
		<PageErrorBoundary>
			<Component {...props} />
		</PageErrorBoundary>
	);

export { PageErrorBoundary, withPageErrorBoundary };
