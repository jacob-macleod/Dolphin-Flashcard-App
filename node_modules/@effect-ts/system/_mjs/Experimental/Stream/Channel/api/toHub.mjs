import * as H from "../../../../Hub/index.mjs";
import * as ToQueue from "./toQueue.mjs";
export function toHub(hub) {
  return ToQueue.toQueue(H.toQueue(hub));
}
//# sourceMappingURL=toHub.mjs.map