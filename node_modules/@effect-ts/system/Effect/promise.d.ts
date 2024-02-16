import type { Lazy } from "../Function/index.js";
import type { IO, UIO } from "./effect.js";
/**
 * Create an Effect that when executed will construct `promise` and wait for its result,
 * errors will be handled using `onReject`
 */
export declare function tryCatchPromise<E, A>(promise: Lazy<Promise<A>>, onReject: (reason: unknown) => E, __trace?: string): IO<E, A>;
/**
 * Create an Effect that when executed will construct `promise` and wait for its result,
 * errors will produce failure as `unknown`
 */
export declare function tryPromise<A>(effect: Lazy<Promise<A>>, __trace?: string): IO<unknown, A>;
/**
 * Like tryPromise but produces a defect in case of errors
 */
export declare function promise<A>(effect: Lazy<Promise<A>>, __trace?: string): UIO<A>;
//# sourceMappingURL=promise.d.ts.map