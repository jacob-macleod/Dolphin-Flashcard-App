import type { Effect, RIO } from "./effect.js";
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @ets_data_first chainError_
 */
export declare function chainError<E, R2, E2>(f: (e: E) => RIO<R2, E2>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R & R2, E2, A>;
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 */
export declare function chainError_<R, E, A, R2, E2>(self: Effect<R, E, A>, f: (e: E) => RIO<R2, E2>, __trace?: string): Effect<R & R2, E2, A>;
//# sourceMappingURL=chainError.d.ts.map