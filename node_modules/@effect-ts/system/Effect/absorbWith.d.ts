import type { Effect } from "./effect.js";
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */
export declare function absorbWith<E>(f: (e: E) => unknown, __trace?: string): <R, A>(fa: Effect<R, E, A>) => Effect<R, unknown, A>;
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */
export declare function absorbWith_<R, A, E>(fa: Effect<R, E, A>, f: (e: E) => unknown, __trace?: string): Effect<R, unknown, A>;
/**
 * Attempts to convert defects into a failure, throwing away all information
 * about the cause of the failure.
 */
export declare function absorb<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, unknown, A>;
//# sourceMappingURL=absorbWith.d.ts.map