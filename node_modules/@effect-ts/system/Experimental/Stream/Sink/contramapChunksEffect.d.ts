import type * as CK from "../../../Collections/Immutable/Chunk/index.js";
import type * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * Effectfully transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */
export declare function contramapChunksEffect_<R, R1, InErr, InErr1 extends InErr, In, In1, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (c: CK.Chunk<In1>) => T.Effect<R1, InErr1, CK.Chunk<In>>): C.Sink<R1 & R, InErr & InErr1, In1, OutErr, L, Z>;
/**
 * Effectfully transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 *
 * @ets_data_first contramapChunksEffect_
 */
export declare function contramapChunksEffect<R1, In, InErr, InErr1 extends InErr, In1>(f: (c: CK.Chunk<In1>) => T.Effect<R1, InErr1, CK.Chunk<In>>): <R, OutErr, L, Z>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R1 & R, InErr & InErr1, In1, OutErr, L, Z>;
//# sourceMappingURL=contramapChunksEffect.d.ts.map