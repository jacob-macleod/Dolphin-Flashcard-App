import * as H from "../../../../Hub/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as FromQueue from "./fromQueue.mjs";
export function fromHubManaged(hub) {
  return M.map_(H.subscribe(hub), FromQueue.fromQueue);
}
//# sourceMappingURL=fromHubManaged.mjs.map