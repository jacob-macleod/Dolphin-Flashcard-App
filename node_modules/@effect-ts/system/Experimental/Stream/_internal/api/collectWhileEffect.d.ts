import * as T from "../../../../Effect/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */
export declare function collectWhileEffect_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, pf: (a: A) => O.Option<T.Effect<R1, E1, A1>>): C.Stream<R & R1, E | E1, A1>;
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhileEffect_
 */
export declare function collectWhileEffect<R1, E1, A, A1>(pf: (a: A) => O.Option<T.Effect<R1, E1, A1>>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=collectWhileEffect.d.ts.map