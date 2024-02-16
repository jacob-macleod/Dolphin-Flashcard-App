import type { Effect } from "./effect.js";
/**
 * Returns an effect that effectfully "peeks" at the failure or success of
 * this effect.
 *
 * @ets_data_first tapBoth_
 */
export declare function tapBoth<E, A, R2, E2, R3, E3, X, Y>(f: (e: E) => Effect<R2, E2, X>, g: (a: A) => Effect<R3, E3, Y>, __trace?: string): <R>(self: Effect<R, E, A>) => Effect<R & R2 & R3, E | E2 | E3, A>;
/**
 * Returns an effect that effectfully "peeks" at the failure or success of
 * this effect.
 */
export declare function tapBoth_<R, E, A, R2, E2, R3, E3, X, Y>(self: Effect<R, E, A>, f: (e: E) => Effect<R2, E2, X>, g: (a: A) => Effect<R3, E3, Y>, __trace?: string): Effect<R & R2 & R3, E | E2 | E3, A>;
//# sourceMappingURL=tapBoth.d.ts.map