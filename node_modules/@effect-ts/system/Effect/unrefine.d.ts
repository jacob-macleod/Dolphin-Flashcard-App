import * as O from "../Option/core.js";
import type { Effect } from "./effect.js";
/**
 * Takes some fiber failures and converts them into errors.
 *
 * @ets_data_first unrefine_
 */
export declare function unrefine<E1>(pf: (u: unknown) => O.Option<E1>, __trace?: string): <R, E, A>(fa: Effect<R, E, A>) => Effect<R, E1 | E, A>;
/**
 * Takes some fiber failures and converts them into errors.
 */
export declare function unrefine_<R, E, A, E1>(fa: Effect<R, E, A>, pf: (u: unknown) => O.Option<E1>, __trace?: string): Effect<R, E | E1, A>;
/**
 * Takes some fiber failures and converts them into errors, using the
 * specified function to convert the `E` into an `E1 | E2`.
 *
 * @ets_data_first unrefineWith_
 */
export declare function unrefineWith<E1, E, E2>(pf: (u: unknown) => O.Option<E1>, f: (e: E) => E2, __trace?: string): <R, A>(fa: Effect<R, E, A>) => Effect<R, E1 | E2, A>;
/**
 * Takes some fiber failures and converts them into errors, using the
 * specified function to convert the `E` into an `E1 | E2`.
 */
export declare function unrefineWith_<R, E, E1, E2, A>(fa: Effect<R, E, A>, pf: (u: unknown) => O.Option<E1>, f: (e: E) => E2, __trace?: string): Effect<R, E1 | E2, A>;
//# sourceMappingURL=unrefine.d.ts.map