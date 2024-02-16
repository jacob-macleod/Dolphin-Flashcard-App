import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first refineOrDieWith_
 */
export declare function refineOrDieWith<E, E1>(pf: (e: E) => O.Option<E1>, f: (e: E) => unknown, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R, E1, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */
export declare function refineOrDieWith_<R, A, E, E1>(self: Effect<R, E, A>, pf: (e: E) => O.Option<E1>, f: (e: E) => unknown, __trace?: string): Effect<R, E1, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @ets_data_first refineOrDie_
 */
export declare function refineOrDie<E, E1>(pf: (e: E) => O.Option<E1>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R, E1, A>;
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */
export declare function refineOrDie_<R, A, E, E1>(self: Effect<R, E, A>, pf: (e: E) => O.Option<E1>, __trace?: string): Effect<R, E1, A>;
//# sourceMappingURL=refineOrDie.d.ts.map