import { Component, type ErrorInfo, type ReactNode } from "react";
import Icon from "@/src/lib/components/custom/Icon";
import { Button } from "@/src/lib/components/ui/button";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
		};
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="relative overflow-hidden rounded-lg border border-destructive/20 bg-destructive/5 p-4 shadow-sm animate-in fade-in duration-300">
					{/* Animated gradient line */}
					<div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-destructive to-transparent" />

					<div className="flex items-start space-x-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-destructive">
							<Icon name="TriangleAlert" className="w-4 h-4" />
						</div>
						<div>
							<h2 className="text-sm font-medium text-destructive">
								Something went wrong
							</h2>
							<p className="mt-1 text-xs text-destructive/80">
								{this.state.error?.message || "An unexpected error occurred"}
							</p>
							<Button
								className="mt-3"
								size="sm"
								variant="destructive"
								onClick={() => this.setState({ hasError: false, error: null })}
							>
								<Icon name="RotateCcw" className="w-3.5 h-3.5 mr-1" />
								Try again
							</Button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

const withErrorBoundary =
	<P extends {}>(Component: React.ComponentType<P>) =>
	(props: P) => (
		<ErrorBoundary>
			<Component {...props} />
		</ErrorBoundary>
	);

export { ErrorBoundary, withErrorBoundary };
