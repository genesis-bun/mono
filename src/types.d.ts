declare module "*.svg" {
	const content: string;
	export default content;
}

// Global type declarations
interface Window {
	gtag?: (...args: unknown[]) => void;
}

const _window: Window = window;
