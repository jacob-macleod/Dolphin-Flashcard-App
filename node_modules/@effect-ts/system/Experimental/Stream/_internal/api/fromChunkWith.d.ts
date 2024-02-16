import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from a `Chunk` of values
 *
 * @param c a chunk of values
 * @return a finite stream of values
 */
export declare function fromChunkWith<O>(c: () => CK.Chunk<O>): C.UIO<O>;
//# sourceMappingURL=fromChunkWith.d.ts.map