// ets_tracing: off
import * as Q from "../../Queue/index.mjs";
import { ensuringFirst_ } from "./ensuringFirst.mjs";
import { fromQueue } from "./fromQueue.mjs";
/**
 * Creates a stream from a {@link XQueue} of values. The queue will be shutdown once the stream is closed.
 */

export function fromQueueWithShutdown(queue) {
  return ensuringFirst_(fromQueue(queue), Q.shutdown(queue));
}
//# sourceMappingURL=fromQueueWithShutdown.mjs.map