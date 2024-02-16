// ets_tracing: off
import * as H from "../../../../Hub/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as ToHub from "./toHub.mjs";
/**
 * Converts the stream to a managed dynamic amount of queues. Every chunk will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */

export function broadcastedQueuesDynamic_(self, maximumLag) {
  return M.map_(ToHub.toHub_(self, maximumLag), _ => H.subscribe(_));
}
/**
 * Converts the stream to a managed dynamic amount of queues. Every chunk will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 *
 * Queues can unsubscribe from upstream by shutting down.
 *
 * @ets_data_first broadcastedQueuesDynamic_
 */

export function broadcastedQueuesDynamic(maximumLag) {
  return self => broadcastedQueuesDynamic_(self, maximumLag);
}
//# sourceMappingURL=broadcastedQueuesDynamic.mjs.map