import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as C from "../core.js";
/**
 * Transforms the chunks emitted by this stream.
 */
export declare function mapChunks_<R, E, A, A1>(self: C.Stream<R, E, A>, f: (chunk: CK.Chunk<A>) => CK.Chunk<A1>): C.Stream<R, E, A1>;
/**
 * Transforms the chunks emitted by this stream.
 *
 * @ets_data_first mapChunks_
 */
export declare function mapChunks<A, A1>(f: (chunk: CK.Chunk<A>) => CK.Chunk<A1>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1>;
//# sourceMappingURL=mapChunks.d.ts.map