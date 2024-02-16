// ets_tracing: off
import * as H from "../../Hub/index.mjs";
import { intoManaged_ } from "./intoManaged.mjs";
/**
 * Like `Stream#intoHub`, but provides the result as a `Managed` to allow for scope
 * composition.
 */

export function intoHubManaged_(self, hub) {
  return intoManaged_(self, H.toQueue(hub));
}
/**
 * Like `Stream#intoHub`, but provides the result as a `Managed` to allow for scope
 * composition.
 */

export function intoHubManaged(hub) {
  return self => intoHubManaged_(self, hub);
}
//# sourceMappingURL=intoHubManaged.mjs.map