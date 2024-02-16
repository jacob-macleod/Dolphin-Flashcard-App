import * as Q from "../../../../Queue/index.mjs";
import * as Ensuring from "./ensuring.mjs";
import * as FromChunkQueue from "./fromChunkQueue.mjs";
/**
 * Creates a stream from a queue of values. The queue will be shutdown once the stream is closed.
 */

export function fromChunkQueueWithShutdown(queue) {
  return Ensuring.ensuring_(FromChunkQueue.fromChunkQueue(queue), Q.shutdown(queue));
}
//# sourceMappingURL=fromChunkQueueWithShutdown.mjs.map