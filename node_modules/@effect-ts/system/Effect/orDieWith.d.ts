import type { Effect } from "./effect.js";
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 *
 * @ets_data_first orDieWith_
 */
export declare function orDieWith<E>(f: (e: E) => unknown, __trace?: string): <R, A>(effect: Effect<R, E, A>) => Effect<R, never, A>;
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 */
export declare function orDieWith_<R, E, A>(effect: Effect<R, E, A>, f: (e: E) => unknown, __trace?: string): Effect<R, never, A>;
//# sourceMappingURL=orDieWith.d.ts.map