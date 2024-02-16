import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
export declare function runForEachChunk_<R, R1, E, E1, A, Z>(self: C.Stream<R, E, A>, f: (c: CK.Chunk<A>) => T.Effect<R1, E1, Z>): T.Effect<R & R1, E | E1, void>;
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 *
 * @ets_data_first runForEachChunk_
 */
export declare function runForEachChunk<R1, E1, A, Z>(f: (c: CK.Chunk<A>) => T.Effect<R1, E1, Z>): <R, E>(self: C.Stream<R, E, A>) => T.Effect<R & R1, E1 | E, void>;
//# sourceMappingURL=runForEachChunk.d.ts.map