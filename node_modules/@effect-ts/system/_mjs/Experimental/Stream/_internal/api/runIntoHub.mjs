import * as H from "../../../../Hub/index.mjs";
import * as RunInto from "./runInto.mjs";
/**
 * Publishes elements of this stream to a hub. Stream failure and ending will
 * also be signalled.
 */

export function runIntoHub_(self, hub) {
  return RunInto.runInto_(self, H.toQueue(hub));
}
/**
 * Publishes elements of this stream to a hub. Stream failure and ending will
 * also be signalled.
 *
 * @ets_data_first runIntoHub_
 */

export function runIntoHub(hub) {
  return self => runIntoHub_(self, hub);
}
//# sourceMappingURL=runIntoHub.mjs.map