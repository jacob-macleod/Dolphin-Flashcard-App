import type { Cause } from "../Cause/cause.js";
import type { Promise } from "./promise.js";
/**
 * Halts the promise with the specified cause, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
export declare function halt_<E, A>(promise: Promise<E, A>, e: Cause<E>): import("../Effect/effect.js").UIO<boolean>;
/**
 * Halts the promise with the specified cause, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
export declare function halt<E>(e: Cause<E>): <A>(promise: Promise<E, A>) => import("../Effect/effect.js").UIO<boolean>;
//# sourceMappingURL=halt.d.ts.map