// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as forEach from "../../../../Effect/excl-forEach.mjs";
import * as coreMap from "../../../../Effect/map.mjs";
import * as List from "../core.mjs";
/**
 * Effectfully maps the elements of this list.
 */

export function mapM_(self, f) {
  return core.suspend(() => {
    const builder = List.emptyPushable();
    return coreMap.map_(forEach.forEachUnit_(self, a => coreMap.map_(f(a), b => {
      List.push_(builder, b);
    })), () => builder);
  });
}
/**
 * Effectfully maps the elements of this list.
 *
 * @ets_data_first mapM_
 */

export function mapM(f) {
  return self => mapM_(self, f);
}
//# sourceMappingURL=mapM.mjs.map