// ets_tracing: off
import * as H from "../../Hub/index.mjs";
import * as M from "../_internal/managed.mjs";
import { toHub_ } from "./toHub.mjs";
/**
 * Converts the stream to a managed dynamic amount of queues. Every chunk will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 * The downstream queues will be provided with chunks in the same order they are returned, so
 * the fastest queue might have seen up to (`maximumLag` + 1) chunks more than the slowest queue if it
 * has a lower index than the slowest queue.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */

export function broadcastedQueuesDynamic_(self, maximumLag) {
  return M.map_(toHub_(self, maximumLag), _ => H.subscribe(_));
}
/**
 * Converts the stream to a managed dynamic amount of queues. Every chunk will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 * The downstream queues will be provided with chunks in the same order they are returned, so
 * the fastest queue might have seen up to (`maximumLag` + 1) chunks more than the slowest queue if it
 * has a lower index than the slowest queue.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */

export function broadcastedQueuesDynamic(maximumLag) {
  return self => broadcastedQueuesDynamic_(self, maximumLag);
}
//# sourceMappingURL=broadcastedQueuesDynamic.mjs.map