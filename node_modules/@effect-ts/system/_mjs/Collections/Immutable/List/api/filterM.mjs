// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as coreZip from "../../../../Effect/zipWith.mjs";
import * as List from "../core.mjs";
/**
 * Filters this list by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 */

export function filterM_(self, f) {
  return core.suspend(() => {
    let dest = core.succeed(List.empty());

    for (const a of self) {
      dest = coreZip.zipWith_(dest, f(a), (d, b) => b ? List.append_(d, a) : d);
    }

    return dest;
  });
}
/**
 * Filters this list by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 *
 * @ets_data_first filterM_
 */

export function filterM(f) {
  return self => filterM_(self, f);
}
//# sourceMappingURL=filterM.mjs.map