import type { Promise } from "./promise.js";
/**
 * Kills the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
export declare function die(e: unknown): <E, A>(promise: Promise<E, A>) => import("../Effect/effect.js").UIO<boolean>;
//# sourceMappingURL=die.d.ts.map