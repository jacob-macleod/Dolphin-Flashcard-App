import type { IO } from "../Effect/effect.js";
import type { Promise } from "./promise.js";
/**
 * Completes the promise with the result of the specified effect. If the
 * promise has already been completed, the method will produce false.
 *
 * Note that `Promise.completeWith` will be much faster, so consider using
 * that if you do not need to memoize the result of the specified effect.
 */
export declare function complete<E, A>(e: IO<E, A>): (promise: Promise<E, A>) => import("../Effect/effect.js").Effect<unknown, never, boolean>;
//# sourceMappingURL=complete.d.ts.map