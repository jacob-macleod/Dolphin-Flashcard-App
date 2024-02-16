import * as T from "../../../../Effect/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Performs an effectful filter and map in a single step.
 */
export declare function collectEffect_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, pf: (a: A) => O.Option<T.Effect<R1, E1, A1>>): C.Stream<R & R1, E | E1, A1>;
/**
 * Performs an effectful filter and map in a single step.
 *
 * @ets_data_first collectEffect_
 */
export declare function collectEffect<R1, E1, A, A1>(pf: (a: A) => O.Option<T.Effect<R1, E1, A1>>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=collectEffect.d.ts.map