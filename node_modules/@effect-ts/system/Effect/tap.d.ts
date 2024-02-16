import type { Effect } from "./effect.js";
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @ets_data_first tap_
 */
export declare function tap<A, R, E, X>(f: (_: A) => Effect<R, E, X>, __trace?: string): <E2, R2>(_: Effect<R2, E2, A>) => Effect<R & R2, E | E2, A>;
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 */
export declare function tap_<E2, R2, A, R, E, X>(_: Effect<R2, E2, A>, f: (_: A) => Effect<R, E, X>, __trace?: string): Effect<R2 & R, E2 | E, A>;
//# sourceMappingURL=tap.d.ts.map