// ets_tracing: off
import * as H from "../../../Hub/index.mjs";
import * as FromQueue from "./fromQueue.mjs";
/**
 * Create a sink which enqueues each element into the specified queue.
 */

export function fromHub(hub) {
  return FromQueue.fromQueue(H.toQueue(hub));
}
//# sourceMappingURL=fromHub.mjs.map