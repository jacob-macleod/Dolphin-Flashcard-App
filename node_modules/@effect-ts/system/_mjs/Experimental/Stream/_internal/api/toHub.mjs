// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as H from "../../../../Hub/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as RunIntoHubManaged from "./runIntoHubManaged.mjs";
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 */

export function toHub_(self, capacity) {
  return M.map_(M.tap_(M.bind_(M.do, "hub", () => T.toManagedRelease_(H.makeBounded(capacity), _ => H.shutdown(_))), ({
    hub
  }) => M.fork(RunIntoHubManaged.runIntoHubManaged_(self, hub))), ({
    hub
  }) => hub);
}
/**
 * Converts the stream to a managed hub of chunks. After the managed hub is used,
 * the hub will never again produce values and should be discarded.
 *
 * @ets_data_first toHub_
 */

export function toHub(capacity) {
  return self => toHub_(self, capacity);
}
//# sourceMappingURL=toHub.mjs.map