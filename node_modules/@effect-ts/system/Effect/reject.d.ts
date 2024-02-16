import * as O from "../Option/index.js";
import type { Effect } from "./effect.js";
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @ets_data_first rejectM_
 */
export declare function rejectM<A, R1, E1>(pf: (a: A) => O.Option<Effect<R1, E1, E1>>, __trace?: string): <R, E>(self: Effect<R, E, A>) => Effect<R & R1, E1 | E, A>;
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 */
export declare function rejectM_<R, E, A, R1, E1>(self: Effect<R, E, A>, pf: (a: A) => O.Option<Effect<R1, E1, E1>>, __trace?: string): Effect<R & R1, E | E1, A>;
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @ets_data_first reject_
 */
export declare function reject<A, E1>(pf: (a: A) => O.Option<E1>, __trace?: string): <R, E>(self: Effect<R, E, A>) => Effect<R, E1 | E, A>;
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 */
export declare function reject_<R, E, A, E1>(self: Effect<R, E, A>, pf: (a: A) => O.Option<E1>, __trace?: string): Effect<R, E | E1, A>;
//# sourceMappingURL=reject.d.ts.map