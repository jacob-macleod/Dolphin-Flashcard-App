import type { Cause } from "../Cause/index.js";
import type { Effect } from "./effect.js";
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 *
 * @ets_data_first sandboxWith_
 */
export declare function sandboxWith<R, E, A, E2>(f: (_: Effect<R, Cause<E>, A>) => Effect<R, Cause<E2>, A>, __trace?: string): (self: Effect<R, E, A>) => Effect<R, E2, A>;
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 */
export declare function sandboxWith_<R, E, A, E2>(self: Effect<R, E, A>, f: (_: Effect<R, Cause<E>, A>) => Effect<R, Cause<E2>, A>, __trace?: string): Effect<R, E2, A>;
//# sourceMappingURL=sandboxWith.d.ts.map