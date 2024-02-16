import type { Effect } from "./effect.js";
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 */
export declare function tapError_<R, E, A, R2, E2, X>(self: Effect<R, E, A>, f: (e: E) => Effect<R2, E2, X>, __trace?: string): Effect<R & R2, E | E2, A>;
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @ets_data_first tapError_
 */
export declare function tapError<E, R2, E2, X>(f: (e: E) => Effect<R2, E2, X>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R & R2, E | E2, A>;
//# sourceMappingURL=tapError.d.ts.map