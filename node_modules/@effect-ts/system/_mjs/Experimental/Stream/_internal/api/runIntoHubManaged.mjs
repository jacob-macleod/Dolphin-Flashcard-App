// ets_tracing: off
import * as H from "../../../../Hub/index.mjs";
import * as RunIntoManaged from "./runIntoManaged.mjs";
/**
 * Like `Stream#runIntoHub`, but provides the result as a `Managed` to allow for scope
 * composition.
 */

export function runIntoHubManaged_(self, hub) {
  return RunIntoManaged.runIntoManaged_(self, H.toQueue(hub));
}
/**
 * Like `Stream#runIntoHub`, but provides the result as a `Managed` to allow for scope
 * composition.
 *
 * @ets_data_first runIntoHubManaged_
 */

export function runIntoHubManaged(hub) {
  return self => runIntoHubManaged_(self, hub);
}
//# sourceMappingURL=runIntoHubManaged.mjs.map