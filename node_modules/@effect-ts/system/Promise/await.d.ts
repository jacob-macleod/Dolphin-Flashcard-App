import type { Promise } from "./promise.js";
/**
 * Retrieves the value of the promise, suspending the fiber running the action
 * until the result is available.
 */
declare function wait<E, A>(promise: Promise<E, A>): import("../Effect/effect.js").Effect<unknown, E, A>;
export { wait as await };
//# sourceMappingURL=await.d.ts.map