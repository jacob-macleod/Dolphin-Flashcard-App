import type { Promise } from "./promise.js";
/**
 * Completes the promise with the specified value.
 */
export declare function succeed<A>(a: A): <E>(promise: Promise<E, A>) => import("../Effect/effect.js").UIO<boolean>;
/**
 * Completes the promise with the specified value.
 */
export declare function succeed_<A, E>(promise: Promise<E, A>, a: A): import("../Effect/effect.js").UIO<boolean>;
//# sourceMappingURL=succeed.d.ts.map