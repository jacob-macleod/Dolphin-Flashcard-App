import type { Effect } from "./effect.js";
/**
 * Makes the effect untraced, but passes it a restore function that can be used to restore
 * the inherited traceability from whatever region the effect is composed into.
 */
export declare function untracedMask<R, E, A>(f: (restore: <R1, E1, A1>(self: Effect<R1, E1, A1>) => Effect<R1, E1, A1>) => Effect<R, E, A>): Effect<R, E, A>;
/**
 * Makes the effect traced, but passes it a restore function that can be used to restore
 * the inherited traceability from whatever region the effect is composed into.
 */
export declare function tracedMask<R, E, A>(f: (restore: <R1, E1, A1>(self: Effect<R1, E1, A1>) => Effect<R1, E1, A1>) => Effect<R, E, A>): Effect<R, E, A>;
//# sourceMappingURL=traceMask.d.ts.map