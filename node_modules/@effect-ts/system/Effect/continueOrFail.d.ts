import * as O from "../Option/core.js";
import type { Effect } from "./effect.js";
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */
export declare function continueOrFailM_<R, E, E1, A, R2, E2, A2>(fa: Effect<R, E, A>, f: () => E1, pf: (a: A) => O.Option<Effect<R2, E2, A2>>, __trace?: string): Effect<R & R2, E | E1 | E2, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */
export declare function continueOrFailM<E1, A, R2, E2, A2>(f: () => E1, pf: (a: A) => O.Option<Effect<R2, E2, A2>>, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R & R2, E1 | E2 | E, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */
export declare function continueOrFail_<R, E, E1, A, A2>(fa: Effect<R, E, A>, f: () => E1, pf: (a: A) => O.Option<A2>, __trace?: string): Effect<R, E | E1, A2>;
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */
export declare function continueOrFail<E1, A, A2>(f: () => E1, pf: (a: A) => O.Option<A2>, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E1 | E, A2>;
//# sourceMappingURL=continueOrFail.d.ts.map