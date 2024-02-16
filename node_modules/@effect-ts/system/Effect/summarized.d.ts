import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Effect } from "./effect.js";
/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 */
export declare function summarized_<R, E, A, R2, E2, B, C>(self: Effect<R, E, A>, summary: Effect<R2, E2, B>, f: (start: B, end: B) => C, __trace?: string): Effect<R & R2, E | E2, Tp.Tuple<[C, A]>>;
/**
 * Summarizes a effect by computing some value before and after execution, and
 * then combining the values to produce a summary, together with the result of
 * execution.
 *
 * @ets_data_first summarized_
 */
export declare function summarized<R2, E2, B, C>(summary: Effect<R2, E2, B>, f: (start: B, end: B) => C, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & R2, E2 | E, Tp.Tuple<[C, A]>>;
//# sourceMappingURL=summarized.d.ts.map