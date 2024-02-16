import type { Promise } from "./promise.js";
/**
 * Fails the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
export declare function fail_<E, A>(promise: Promise<E, A>, e: E): import("../Effect/effect.js").UIO<boolean>;
/**
 * Fails the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */
export declare function fail<E>(e: E): <A>(promise: Promise<E, A>) => import("../Effect/effect.js").UIO<boolean>;
//# sourceMappingURL=fail.d.ts.map