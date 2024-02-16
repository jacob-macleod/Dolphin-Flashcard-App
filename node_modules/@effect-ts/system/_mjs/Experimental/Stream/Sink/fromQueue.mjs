// ets_tracing: off
import * as Q from "../../../Queue/index.mjs";
import * as ForEachChunk from "./forEachChunk.mjs";
/**
 * Create a sink which enqueues each element into the specified queue.
 */

export function fromQueue(queue) {
  return ForEachChunk.forEachChunk(_ => Q.offerAll_(queue, _));
}
//# sourceMappingURL=fromQueue.mjs.map