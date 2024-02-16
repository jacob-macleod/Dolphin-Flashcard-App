import type { Effect } from "./effect.js";
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
export declare function mapBoth_<R, E, E1, A, B>(self: Effect<R, E, A>, f: (e: E) => E1, g: (a: A) => B, __trace?: string): Effect<R, E1, B>;
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first mapBoth_
 */
export declare function mapBoth<E, E1, A, B>(f: (e: E) => E1, g: (a: A) => B, __trace?: string): <R>(self: Effect<R, E, A>) => Effect<R, E1, B>;
//# sourceMappingURL=mapBoth.d.ts.map