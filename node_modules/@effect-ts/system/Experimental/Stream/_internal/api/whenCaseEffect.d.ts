import type * as T from "../../../../Effect/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given effectful value, otherwise returns an empty stream.
 */
export declare function whenCaseEffect_<R, R1, E, E1, A, A1>(a: T.Effect<R, E, A>, pf: (a: A) => O.Option<C.Stream<R1, E1, A1>>): C.Stream<R & R1, E | E1, A1>;
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given effectful value, otherwise returns an empty stream.
 *
 * @ets_data_first whenCaseEffect_
 */
export declare function whenCaseEffect<R1, E1, A, A1>(pf: (a: A) => O.Option<C.Stream<R1, E1, A1>>): <R, E>(a: T.Effect<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=whenCaseEffect.d.ts.map