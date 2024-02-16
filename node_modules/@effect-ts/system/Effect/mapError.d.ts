import type { Effect } from "./effect.js";
/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger"
 * error.
 */
export declare function mapError_<R, E, E2, A>(self: Effect<R, E, A>, f: (e: E) => E2, __trace?: string): Effect<R, E2, A>;
/**
 * Returns an effect with its error channel mapped using the specified
 * function. This can be used to lift a "smaller" error into a "larger"
 * error.
 *
 * @ets_data_first mapError_
 */
export declare function mapError<E, E2>(f: (e: E) => E2, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R, E2, A>;
//# sourceMappingURL=mapError.d.ts.map