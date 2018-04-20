
/**
 * Compose the given handlers and return a handler
 * 
 * @param fns handlers
 */
function compose (fns: Function[]): (ctx: object, done: Function) => Promise<void>;

export default compose;
