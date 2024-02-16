// ets_tracing: off
import * as H from "../../Hub/index.mjs";
import { chain_ } from "./chain.mjs";
import { fromQueue } from "./fromQueue.mjs";
import { managed } from "./managed.mjs";
/**
 * Creates a stream from a subscription to a hub.
 */

export function fromHub(hub) {
  return chain_(managed(H.subscribe(hub)), queue => fromQueue(queue));
}
//# sourceMappingURL=fromHub.mjs.map