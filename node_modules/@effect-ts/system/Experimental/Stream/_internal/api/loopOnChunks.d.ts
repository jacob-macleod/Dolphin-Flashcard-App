import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as CH from "../../Channel/index.js";
import * as C from "../core.js";
/**
 * Loops over the stream chunks concatenating the result of f
 */
export declare function loopOnChunks_<R, E, A, R1, E1, A1>(self: C.Stream<R, E, A>, f: (a: CK.Chunk<A>) => CH.Channel<R1, E | E1, CK.Chunk<A>, unknown, E | E1, CK.Chunk<A1>, boolean>): C.Stream<R & R1, E | E1, A1>;
/**
 * Loops over the stream chunks concatenating the result of f
 *
 * @ets_data_first loopOnChunks_
 */
export declare function loopOnChunks<E, A, R1, E1, A1>(f: (a: CK.Chunk<A>) => CH.Channel<R1, E | E1, CK.Chunk<A>, unknown, E | E1, CK.Chunk<A1>, boolean>): <R>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E | E1, A1>;
//# sourceMappingURL=loopOnChunks.d.ts.map