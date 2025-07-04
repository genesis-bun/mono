declare module "*.svg" {
  const content: string;
  export default content;
}

interface Window {
  gtag?: (...args: any[]) => void;
}