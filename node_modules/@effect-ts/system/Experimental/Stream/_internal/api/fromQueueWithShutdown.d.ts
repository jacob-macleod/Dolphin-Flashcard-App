import * as Q from "../../../../Queue/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from a queue of values. The queue will be shutdown once the stream is closed.
 *
 * @param maxChunkSize Maximum number of queued elements to put in one chunk in the stream
 */
export declare function fromQueueWithShutdown_<R, E, O>(queue: Q.XQueue<never, R, unknown, E, never, O>, maxChunkSize?: number): C.Stream<R, E, O>;
/**
 * Creates a stream from a queue of values. The queue will be shutdown once the stream is closed.
 *
 * @param maxChunkSize Maximum number of queued elements to put in one chunk in the stream
 *
 * @ets_data_first fromQueueWithShutdown_
 */
export declare function fromQueueWithShutdown<R, E, O>(maxChunkSize?: number): (queue: Q.XQueue<never, R, unknown, E, never, O>) => C.Stream<R, E, O>;
//# sourceMappingURL=fromQueueWithShutdown.d.ts.map