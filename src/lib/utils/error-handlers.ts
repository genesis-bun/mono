import { toast } from "sonner";
import { ZodError } from "zod";

export const safeExecute = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch (error) {
    handleError(error);
    return fallback;
  }
};

export const safeMap = <T, R>(
  items: T[] | undefined | null,
  mapFn: (item: T, index: number) => R,
  fallback: R[] = [],
): R[] => {
  if (!items) return fallback;

  return items
    .map((item, index) => {
      try {
        return mapFn(item, index);
      } catch (error) {
        handleError(error);
        return undefined as unknown as R;
      }
    })
    .filter((item): item is R => item !== undefined);
};

export function isZodError(err: unknown): err is ZodError {
  return Boolean(
    err && (err instanceof ZodError || (err as ZodError).name === 'ZodError'),
  );
}

export function handleError(error: unknown) {
  if(isZodError(error)) {
    console.error(error.issues.map((issue) => issue.message).join(', '));
    toast.error(`${error.issues.map((issue) => issue.message).join(', ')}`);
    return;
  }

  if(error instanceof Error) {  
    console.error(error.message);
    toast.error(error.message);
    return;
  }

  toast.error("An unknown error occurred");
}