
/**
 * Compose the given handlers and return a handler
 * 
 * @param fns handlers
 */
export default function compose (fns: Function[]): (...args: any[]) => Promise<void>;
