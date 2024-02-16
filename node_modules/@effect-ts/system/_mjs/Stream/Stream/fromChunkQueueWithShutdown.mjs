import * as Q from "../../Queue/index.mjs";
import { ensuringFirst_ } from "./ensuringFirst.mjs";
import { fromChunkQueue } from "./fromChunkQueue.mjs";
/**
 * Creates a stream from a {@link XQueue} of values. The queue will be shutdown once the stream is closed.
 */

export function fromChunkQueueWithShutdown(queue) {
  return ensuringFirst_(fromChunkQueue(queue), Q.shutdown(queue));
}
//# sourceMappingURL=fromChunkQueueWithShutdown.mjs.map