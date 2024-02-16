import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as Q from "../../../../Queue/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from a queue of values
 */
export declare function fromChunkQueue<R, E, O>(queue: Q.XQueue<never, R, unknown, E, never, CK.Chunk<O>>): C.Stream<R, E, O>;
//# sourceMappingURL=fromChunkQueue.d.ts.map