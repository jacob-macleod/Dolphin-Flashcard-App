import * as CK from "../../../Collections/Immutable/Chunk/index.js";
import type * as C from "./core.js";
/**
 * A sink that collects first `n` elements into a chunk. Note that the chunk
 * is preallocated and must fit in memory.
 */
export declare function collectAllN<Err, In>(n: number): C.Sink<unknown, Err, In, Err, In, CK.Chunk<In>>;
//# sourceMappingURL=collectAllN.d.ts.map