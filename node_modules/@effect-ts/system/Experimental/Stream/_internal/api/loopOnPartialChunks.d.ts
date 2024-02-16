import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Loops on chunks emitting partially
 */
export declare function loopOnPartialChunks_<R, E, A, R1, E1, A1>(self: C.Stream<R, E, A>, f: (a: CK.Chunk<A>, emit: (a: A1) => T.UIO<void>) => T.Effect<R1, E1, boolean>): C.Stream<R & R1, E | E1, A1>;
/**
 * Loops on chunks emitting partially
 *
 * @ets_data_first loopOnPartialChunks_
 */
export declare function loopOnPartialChunks<A, R1, E1, A1>(f: (a: CK.Chunk<A>, emit: (a: A1) => T.UIO<void>) => T.Effect<R1, E1, boolean>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=loopOnPartialChunks.d.ts.map