// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as H from "../../Hub/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { intoHubManaged_ } from "./intoHubManaged.mjs";
/**
 * Converts the stream to a managed list of queues. Every value will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 * The downstream queues will be provided with chunks in the same order they are returned, so
 * the fastest queue might have seen up to (`maximumLag` + 1) chunks more than the slowest queue if it
 * has a lower index than the slowest queue.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */

export function broadcastedQueues(n, maximumLag) {
  return self => broadcastedQueues_(self, n, maximumLag);
}
/**
 * Converts the stream to a managed list of queues. Every value will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 * The downstream queues will be provided with chunks in the same order they are returned, so
 * the fastest queue might have seen up to (`maximumLag` + 1) chunks more than the slowest queue if it
 * has a lower index than the slowest queue.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */

export function broadcastedQueues_(self, n, maximumLag) {
  return M.map_(M.tap_(M.bind_(M.bind_(M.do, "hub", () => T.toManaged(H.makeBounded(maximumLag))), "queues", ({
    hub
  }) => M.collectAll(Array.from({
    length: n
  }, () => H.subscribe(hub)))), ({
    hub
  }) => M.fork(intoHubManaged_(self, hub))), ({
    queues
  }) => A.from(queues));
}
//# sourceMappingURL=broadcastedQueues.mjs.map