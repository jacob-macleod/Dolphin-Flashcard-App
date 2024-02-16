import type * as CS from "../../../../Cause/index.js";
import * as C from "../core.js";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */
export declare function catchAllCause_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, f: (cause: CS.Cause<E>) => C.Stream<R1, E1, A1>): C.Stream<R & R1, E1, A | A1>;
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 *
 * @ets_data_first catchAllCause_
 */
export declare function catchAllCause<R1, E, E1, A1>(f: (cause: CS.Cause<E>) => C.Stream<R1, E1, A1>): <R, A>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1, A1 | A>;
//# sourceMappingURL=catchAllCause.d.ts.map