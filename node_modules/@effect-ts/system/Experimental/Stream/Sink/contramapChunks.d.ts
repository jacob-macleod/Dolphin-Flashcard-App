import type * as CK from "../../../Collections/Immutable/Chunk/index.js";
import * as C from "./core.js";
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */
export declare function contramapChunks_<R, InErr, In, In1, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (c: CK.Chunk<In1>) => CK.Chunk<In>): C.Sink<R, InErr, In1, OutErr, L, Z>;
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 *
 * @ets_data_first contramapChunks_
 */
export declare function contramapChunks<In, In1>(f: (c: CK.Chunk<In1>) => CK.Chunk<In>): <R, InErr, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In1, OutErr, L, Z>;
//# sourceMappingURL=contramapChunks.d.ts.map