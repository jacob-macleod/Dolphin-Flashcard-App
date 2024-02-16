import type * as CS from "../../../../Cause/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */
export declare function catchSomeCause_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, pf: (e: CS.Cause<E>) => O.Option<C.Stream<R1, E1, A1>>): C.Stream<R & R1, E | E1, A | A1>;
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some errors. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 *
 * @ets_data_first catchSomeCause_
 */
export declare function catchSomeCause<R1, E, E1, A1>(pf: (e: CS.Cause<E>) => O.Option<C.Stream<R1, E1, A1>>): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E | E1, A1 | A>;
//# sourceMappingURL=catchSomeCause.d.ts.map