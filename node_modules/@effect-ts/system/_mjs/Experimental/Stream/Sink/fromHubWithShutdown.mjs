// ets_tracing: off
import * as H from "../../../Hub/index.mjs";
import * as FromQueueWithShutdown from "./fromQueueWithShutdown.mjs";
/**
 * Create a sink which enqueues each element into the specified queue.
 */

export function fromHubWithShutdown(hub) {
  return FromQueueWithShutdown.fromQueueWithShutdown(H.toQueue(hub));
}
//# sourceMappingURL=fromHubWithShutdown.mjs.map