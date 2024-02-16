import type { Cause } from "../Cause/cause.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect with its full cause of failure mapped using
 * the specified function. This can be used to transform errors
 * while preserving the original structure of Cause.
 */
export declare function mapErrorCause_<R, E, A, E2>(self: Effect<R, E, A>, f: (cause: Cause<E>) => Cause<E2>, __trace?: string): Effect<R, E2, A>;
/**
 * Returns an effect with its full cause of failure mapped using
 * the specified function. This can be used to transform errors
 * while preserving the original structure of Cause.
 */
export declare function mapErrorCause<E, E2>(f: (cause: Cause<E>) => Cause<E2>, __trace?: string): <R, A>(self: Effect<R, E, A>) => Effect<R, E2, A>;
//# sourceMappingURL=mapErrorCause.d.ts.map