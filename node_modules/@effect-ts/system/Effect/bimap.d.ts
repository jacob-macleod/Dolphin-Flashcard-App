import type { Effect } from "./effect.js";
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
export declare function bimap<E, A, E2, B>(f: (e: E) => E2, g: (a: A) => B, __trace?: string): <R>(self: Effect<R, E, A>) => Effect<R, E2, B>;
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
export declare function bimap_<R, E, A, E2, B>(self: Effect<R, E, A>, f: (e: E) => E2, g: (a: A) => B, __trace?: string): Effect<R, E2, B>;
//# sourceMappingURL=bimap.d.ts.map