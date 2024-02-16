// ets_tracing: off
import * as H from "../../Hub/index.mjs";
import { into_ } from "./into.mjs";
/**
 * Publishes elements of this stream to a hub. Stream failure and ending will also be
 * signalled.
 */

export function intoHub(self, hub) {
  return into_(self, H.toQueue(hub));
}
//# sourceMappingURL=intoHub.mjs.map