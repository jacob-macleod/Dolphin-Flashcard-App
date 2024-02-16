import type { Effect, RIO } from "./effect.js";
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 */
export declare function fold_<R, E, A, A2, A3>(value: Effect<R, E, A>, failure: (failure: E) => A2, success: (a: A) => A3, __trace?: string): Effect<R, never, A2 | A3>;
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 *
 * @ets_data_first fold_
 */
export declare function fold<E, A, A2, A3>(failure: (failure: E) => A2, success: (a: A) => A3, __trace?: string): <R>(value: Effect<R, E, A>) => RIO<R, A2 | A3>;
//# sourceMappingURL=fold.d.ts.map