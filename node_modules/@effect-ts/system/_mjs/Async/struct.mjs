// ets_tracing: off
import * as R from "../Collections/Immutable/Dictionary/index.mjs";
import { map_ } from "./core.mjs";
import { forEach_, forEachPar_ } from "./excl-forEach.mjs";
/**
 * Applicative structure
 */

export function struct(r) {
  return map_(forEach_(R.collect_(r, (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a])), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
/**
 * Applicative structure processed in parallel
 */

export function structPar(r, __trace) {
  return map_(forEachPar_(R.collect_(r, (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a])), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
//# sourceMappingURL=struct.mjs.map