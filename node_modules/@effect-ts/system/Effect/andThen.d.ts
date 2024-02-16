import type { Effect } from "./effect.js";
/**
 * Propagates the given environment to self.
 *
 * @ets_data_first andThen_
 */
export declare function andThen<A, E1, A1>(fb: Effect<A, E1, A1>, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E1 | E, A1>;
/**
 * Propagates the given environment to self.
 */
export declare function andThen_<R, E, A, E1, A1>(fa: Effect<R, E, A>, fb: Effect<A, E1, A1>, __trace?: string): Effect<R, E | E1, A1>;
//# sourceMappingURL=andThen.d.ts.map