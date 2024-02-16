import * as M from "../../../../Managed/index.mjs";
import * as RunManaged from "./runManaged.mjs";
/**
 * Runs a channel until the end is received
 */

export function run(self) {
  return M.useNow(RunManaged.runManaged(self));
}
//# sourceMappingURL=run.mjs.map