import type { Effect, UIO } from "./effect.js";
/**
 * Returns a memoized version of the specified effectual function.
 */
export declare function memoize<A, R, E, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): UIO<(a: A) => Effect<R, E, B>>;
/**
 * Returns a memoized version of the specified effectual function.
 *
 * This variant uses the compare function to compare `A`
 */
export declare function memoizeEq<A>(compare: (r: A) => (l: A) => boolean): <R, E, B>(f: (a: A) => Effect<R, E, B>) => UIO<(a: A) => Effect<R, E, B>>;
//# sourceMappingURL=memoize.d.ts.map