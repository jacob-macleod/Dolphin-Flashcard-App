// ets_tracing: off
import * as SS from "../Collections/Immutable/SortedSet/index.mjs";
import { track } from "../Supervisor/index.mjs";
import { chain_, supervised } from "./core.mjs";
import { descriptor } from "./descriptor.mjs";
import { map_ } from "./map.mjs";
/**
 * Locally installs a supervisor and an effect that succeeds with all the
 * children that have been forked in the returned effect.
 */

export function withChildren(get, __trace) {
  return chain_(track, supervisor => supervised(supervisor)(get(chain_(supervisor.value, children => map_(descriptor, d => SS.filter_(children, _ => _.id !== d.id))))), __trace);
}
//# sourceMappingURL=withChildren.mjs.map