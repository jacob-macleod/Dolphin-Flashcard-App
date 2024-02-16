import type { Effect } from "./effect.js";
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 */
export declare function zipWithPar_<R, E, A, R2, E2, A2, B>(a: Effect<R, E, A>, b: Effect<R2, E2, A2>, f: (a: A, b: A2) => B, __trace?: string): Effect<R & R2, E | E2, B>;
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 */
export declare function zipWithPar<A, R2, E2, A2, B>(b: Effect<R2, E2, A2>, f: (a: A, b: A2) => B, __trace?: string): <R, E>(a: Effect<R, E, A>) => Effect<R & R2, E2 | E, B>;
//# sourceMappingURL=zipWithPar.d.ts.map