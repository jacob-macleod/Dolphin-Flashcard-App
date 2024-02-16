import type { Predicate, Refinement } from "../Function/index.js";
import type { Effect } from "./effect.js";
/**
 * Dies with specified `unknown` if the predicate fails.
 *
 * @ets_data_first filterOrDie_
 */
export declare function filterOrDie<A, B extends A>(p: Refinement<A, B>, dieWith: (a: Exclude<A, B>) => unknown, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E, B>;
export declare function filterOrDie<A>(p: Predicate<A>, dieWith: (a: A) => unknown, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Dies with specified `unknown` if the predicate fails.
 */
export declare function filterOrDie_<R, E, A, B extends A>(fa: Effect<R, E, A>, p: Refinement<A, B>, dieWith: (a: Exclude<A, B>) => unknown, __trace?: string): Effect<R, E, B>;
export declare function filterOrDie_<R, E, A>(fa: Effect<R, E, A>, p: Predicate<A>, dieWith: (a: A) => unknown, __trace?: string): Effect<R, E, A>;
/**
 * Fails with `failWith` if the predicate fails.
 *
 * @ets_data_first filterOrFail_
 */
export declare function filterOrFail<A, B extends A, E1>(p: Refinement<A, B>, failWith: (a: Exclude<A, B>) => E1, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E | E1, B>;
export declare function filterOrFail<A, E1>(p: Predicate<A>, failWith: (a: A) => E1, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E | E1, A>;
/**
 * Fails with `failWith` if the predicate fails.
 */
export declare function filterOrFail_<R, E, E1, A, B extends A>(fa: Effect<R, E, A>, p: Refinement<A, B>, failWith: (a: Exclude<A, B>) => E1, __trace?: string): Effect<R, E | E1, B>;
export declare function filterOrFail_<R, E, E1, A>(fa: Effect<R, E, A>, p: Predicate<A>, failWith: (a: A) => E1, __trace?: string): Effect<R, E | E1, A>;
/**
 * Applies `or` if the predicate fails.
 *
 * @ets_data_first filterOrElse_
 */
export declare function filterOrElse<A, B extends A, R2, E2, A2>(p: Refinement<A, B>, or: (a: Exclude<A, B>) => Effect<R2, E2, A2>, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R & R2, E | E2, B | A2>;
export declare function filterOrElse<A, R2, E2, A2>(p: Predicate<A>, or: (a: A) => Effect<R2, E2, A2>, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R & R2, E | E2, A | A2>;
/**
 * Applies `or` if the predicate fails.
 */
export declare function filterOrElse_<R, E, A, B extends A, R2, E2, A2>(fa: Effect<R, E, A>, p: Refinement<A, B>, or: (a: Exclude<A, B>) => Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, B | A2>;
export declare function filterOrElse_<R, E, A, R2, E2, A2>(fa: Effect<R, E, A>, p: Predicate<A>, or: (a: A) => Effect<R2, E2, A2>, __trace?: string): Effect<R & R2, E | E2, A | A2>;
/**
 * Dies with a `Error` having the specified text message
 * if the predicate fails.
 *
 * @ets_data_first filterOrDieMessage_
 */
export declare function filterOrDieMessage<A, B extends A>(p: Refinement<A, B>, message: (a: Exclude<A, B>) => string, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E, B>;
export declare function filterOrDieMessage<A>(p: Predicate<A>, message: (a: A) => string, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E, A>;
/**
 * Dies with a `Error` having the specified text message
 * if the predicate fails.
 */
export declare function filterOrDieMessage_<R, E, A, B extends A>(fa: Effect<R, E, A>, p: Refinement<A, B>, message: (a: Exclude<A, B>) => string, __trace?: string): Effect<R, E, B>;
export declare function filterOrDieMessage_<R, E, A>(fa: Effect<R, E, A>, p: Predicate<A>, message: (a: A) => string, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=filterOr.d.ts.map