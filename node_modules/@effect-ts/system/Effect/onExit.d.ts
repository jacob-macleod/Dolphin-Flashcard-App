import type { Cause } from "../Cause/cause.js";
import type { Exit } from "../Exit/exit.js";
import type { Effect } from "./effect.js";
/**
 * Execute a cleanup function when the effect completes
 */
export declare function onExit_<R, E, A, R2, E2, X>(self: Effect<R, E, A>, cleanup: (exit: Exit<E, A>) => Effect<R2, E2, X>, __trace?: string): Effect<R & R2, E | E2, A>;
/**
 * Execute a cleanup function when the effect completes
 *
 * @ets_data_first onExit_
 */
export declare function onExit<E, A, R2, E2, X>(cleanup: (exit: Exit<E, A>) => Effect<R2, E2, X>, __trace?: string): <R>(self: Effect<R, E, A>) => Effect<R & R2, E | E2, A>;
/**
 * Execute a cleanup function when the effect errors
 *
 * @ets_data_first onError_
 */
export declare function onError<E, A, R2, E2, X>(cleanup: (exit: Cause<E>) => Effect<R2, E2, X>, __trace?: string): <R>(self: Effect<R, E, A>) => Effect<R & R2, E | E2, A>;
/**
 * Execute a cleanup function when the effect errors
 */
export declare function onError_<R, E, A, R2, E2, X>(self: Effect<R, E, A>, cleanup: (exit: Cause<E>) => Effect<R2, E2, X>, __trace?: string): Effect<R & R2, E | E2, A>;
//# sourceMappingURL=onExit.d.ts.map