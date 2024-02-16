import type { Promise } from "./promise.js";
/**
 * Completes the promise with interruption. This will interrupt all fibers
 * waiting on the value of the promise as by the fiber calling this method.
 */
export declare function interrupt<E, A>(promise: Promise<E, A>): import("../Effect/effect.js").Effect<unknown, never, boolean>;
//# sourceMappingURL=interrupt.d.ts.map