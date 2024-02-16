// ets_tracing: off
import * as R from "../Collections/Immutable/Dictionary/index.mjs";
import { chain_, map_ } from "./core.mjs";
import { forEach_, forEachPar_ } from "./excl-forEach.mjs";
/**
 * Bind a record of effects in a do
 *
 * @ets_data_first bindAll_
 */

export function bindAll(r) {
  // @ts-expect-error
  return s => bindAll_(s, r);
}
/**
 * Bind a record of effects in a do
 */

export function bindAll_(s, r) {
  return chain_(s, k => map_(forEach_(R.collect_(r(k), (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a])), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }));
}
/**
 * Bind a record of effects, in parallel, in a do
 *
 * @ets_data_first bindAllPar_
 */

export function bindAllPar(r) {
  // @ts-expect-error
  return s => bindAllPar_(s, r);
}
/**
 * Bind a record of effects, in parallel, in a do
 */

export function bindAllPar_(s, r) {
  return chain_(s, k => map_(forEachPar_(R.collect_(r(k), (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a])), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }));
}
//# sourceMappingURL=bindAll.mjs.map