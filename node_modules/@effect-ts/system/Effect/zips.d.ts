import type { Effect } from "./effect.js";
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 */
export declare function zipLeft_<R, E, A, R2, E2, A2>(a: Effect<R, E, A>, b: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, A>;
/**
 * Sequentially zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeft_
 */
export declare function zipLeft<R2, E2, A2>(b: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(a: Effect<R, E, A>) => Effect<R & R2, E2 | E, A>;
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 */
export declare function zipLeftPar_<R, E, A, R2, E2, A2>(a: Effect<R, E, A>, b: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, A>;
/**
 * Parallelly zips this effect with the specified effect
 * returning the left side
 *
 * @ets_data_first zipLeftPar_
 */
export declare function zipLeftPar<R2, E2, A2>(b: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(a: Effect<R, E, A>) => Effect<R & R2, E2 | E, A>;
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 */
export declare function zipRight_<R, E, A, R2, E2, A2>(a: Effect<R, E, A>, b: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, A2>;
/**
 * Sequentially zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRight_
 */
export declare function zipRight<R2, E2, A2>(b: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(a: Effect<R, E, A>) => Effect<R & R2, E2 | E, A2>;
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 */
export declare function zipRightPar_<R, E, A, R2, E2, A2>(a: Effect<R, E, A>, b: Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, A2>;
/**
 * Parallelly zips this effect with the specified effect
 * returning the right side
 *
 * @ets_data_first zipRightPar_
 */
export declare function zipRightPar<R2, E2, A2>(b: Effect<R2, E2, A2>, __trace?: string): <R, E, A>(a: Effect<R, E, A>) => Effect<R & R2, E2 | E, A2>;
//# sourceMappingURL=zips.d.ts.map