import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Loops on chunks elements emitting partially
 */
export declare function loopOnPartialChunksElements_<R, E, A, R1, E1, A1>(self: C.Stream<R, E, A>, f: (a: A, emit: (a: A1) => T.UIO<void>) => T.Effect<R1, E1, void>): C.Stream<R & R1, E | E1, A1>;
/**
 * Loops on chunks elements emitting partially
 *
 * @ets_data_first loopOnPartialChunksElements_
 */
export declare function loopOnPartialChunksElements<A, R1, E1, A1>(f: (a: A, emit: (a: A1) => T.UIO<void>) => T.Effect<R1, E1, void>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=loopOnPartialChunksElements.d.ts.map