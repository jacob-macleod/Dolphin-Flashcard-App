import type * as CK from "../../../Collections/Immutable/Chunk/index.js";
import type * as C from "./core.js";
/**
 * Transforms both input chunks and result of this sink using the provided functions.
 */
export declare function dimapChunks_<R, InErr, In, In1, OutErr, L, Z, Z1>(self: C.Sink<R, InErr, In, OutErr, L, Z>, f: (in_: CK.Chunk<In1>) => CK.Chunk<In>, g: (z: Z) => Z1): C.Sink<R, InErr, In1, OutErr, L, Z1>;
/**
 * Transforms both input chunks and result of this sink using the provided functions.
 *
 * @ets_data_first dimapChunks_
 */
export declare function dimapChunks<In, In1, Z, Z1>(f: (in_: CK.Chunk<In1>) => CK.Chunk<In>, g: (z: Z) => Z1): <R, InErr, OutErr, L>(self: C.Sink<R, InErr, In, OutErr, L, Z>) => C.Sink<R, InErr, In1, OutErr, L, Z1>;
//# sourceMappingURL=dimapChunks.d.ts.map