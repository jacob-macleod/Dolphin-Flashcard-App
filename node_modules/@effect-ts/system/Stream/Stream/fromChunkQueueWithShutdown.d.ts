import type * as A from "../../Collections/Immutable/Chunk/index.js";
import * as Q from "../../Queue/index.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from a {@link XQueue} of values. The queue will be shutdown once the stream is closed.
 */
export declare function fromChunkQueueWithShutdown<R, E, O>(queue: Q.XQueue<never, R, unknown, E, never, A.Chunk<O>>): Stream<R, E, O>;
//# sourceMappingURL=fromChunkQueueWithShutdown.d.ts.map