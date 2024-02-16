// ets_tracing: off
import * as H from "../../Hub/index.mjs";
import { ensuringFirst_ } from "./ensuringFirst.mjs";
import { fromHub } from "./fromHub.mjs";
/**
 * Creates a stream from a subscription to a hub.
 */

export function fromHubWithShutdown(hub) {
  return ensuringFirst_(fromHub(hub), H.shutdown(hub));
}
//# sourceMappingURL=fromHubWithShutdown.mjs.map