import type { Effect } from "./effect.js";
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * This method has better performance than `either` since no intermediate
 * value is allocated and does not require subsequent calls to `flatMap` to
 * define the next effect.
 *
 * The error parameter of the returned `IO` may be chosen arbitrarily, since
 * it will depend on the `IO`s returned by the given continuations.
 */
export declare function foldM_<R, E, A, R2, E2, A2, R3, E3, A3>(value: Effect<R, E, A>, failure: (failure: E) => Effect<R2, E2, A2>, success: (a: A) => Effect<R3, E3, A3>, __trace?: string): Effect<R & R2 & R3, E2 | E3, A2 | A3>;
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * This method has better performance than `either` since no intermediate
 * value is allocated and does not require subsequent calls to `flatMap` to
 * define the next effect.
 *
 * The error parameter of the returned `IO` may be chosen arbitrarily, since
 * it will depend on the `IO`s returned by the given continuations.
 *
 * @ets_data_first foldM_
 */
export declare function foldM<E, A, R2, E2, A2, R3, E3, A3>(failure: (failure: E) => Effect<R2, E2, A2>, success: (a: A) => Effect<R3, E3, A3>, __trace?: string): <R>(value: Effect<R, E, A>) => Effect<R & R2 & R3, E2 | E3, A2 | A3>;
//# sourceMappingURL=foldM.d.ts.map