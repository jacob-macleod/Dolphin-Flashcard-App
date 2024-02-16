// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as H from "../../../../Hub/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as RunIntoHubManaged from "./runIntoHubManaged.mjs";
/**
 * Converts the stream to a managed list of queues. Every value will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */

export function broadcastedQueues_(self, n, maximumLag) {
  return M.map_(M.tap_(M.bind_(M.bind_(M.do, "hub", () => T.toManaged(H.makeBounded(maximumLag))), "queues", ({
    hub
  }) => M.collectAll(CK.fill(n, () => H.subscribe(hub)))), ({
    hub
  }) => M.fork(RunIntoHubManaged.runIntoHubManaged_(self, hub))), ({
    queues
  }) => queues);
}
/**
 * Converts the stream to a managed list of queues. Every value will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 *
 * Queues can unsubscribe from upstream by shutting down.
 *
 * @ets_data_first broadcastedQueues_
 */

export function broadcastedQueues(n, maximumLag) {
  return self => broadcastedQueues_(self, n, maximumLag);
}
//# sourceMappingURL=broadcastedQueues.mjs.map