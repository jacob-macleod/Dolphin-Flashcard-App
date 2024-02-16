import type { Effect, RIO } from "./effect.js";
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 *
 * @ets_data_first cond_
 */
export declare function cond<E, A>(onTrue: () => A, onFalse: () => E, __trace?: string): (b: boolean) => Effect<unknown, E, A>;
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */
export declare function cond_<E, A>(b: boolean, onTrue: () => A, onFalse: () => E, __trace?: string): Effect<unknown, E, A>;
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */
export declare function condM_<R, R2, E, A>(b: boolean, onTrue: RIO<R, A>, onFalse: RIO<R2, E>, __trace?: string): Effect<R & R2, E, A>;
/**
 * Evaluate the predicate,
 * return the given A as success if predicate returns true,
 * and the given E as error otherwise
 */
export declare function condM<R, R2, E, A>(onTrue: RIO<R, A>, onFalse: RIO<R2, E>, __trace?: string): (b: boolean) => Effect<R & R2, E, A>;
//# sourceMappingURL=cond.d.ts.map