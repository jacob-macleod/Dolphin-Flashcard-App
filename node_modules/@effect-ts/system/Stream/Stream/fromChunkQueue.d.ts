import type * as A from "../../Collections/Immutable/Chunk/index.js";
import * as Q from "../../Queue/index.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from a {@link XQueue} of values
 */
export declare function fromChunkQueue<R, E, O>(queue: Q.XQueue<never, R, unknown, E, never, A.Chunk<O>>): Stream<R, E, O>;
//# sourceMappingURL=fromChunkQueue.d.ts.map