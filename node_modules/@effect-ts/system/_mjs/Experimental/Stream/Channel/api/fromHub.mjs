import * as H from "../../../../Hub/index.mjs";
import * as FromQueue from "./fromQueue.mjs";
import * as Managed from "./managed.mjs";
export function fromHub(hub) {
  return Managed.managed_(H.subscribe(hub), FromQueue.fromQueue);
}
//# sourceMappingURL=fromHub.mjs.map