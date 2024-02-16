// ets_tracing: off
import * as R from "../Collections/Immutable/Dictionary/index.mjs";
import { chain_ } from "./core.mjs";
import { forEach_, forEachPar_, forEachParN_ } from "./excl-forEach.mjs";
import { map_ } from "./map.mjs";
/**
 * Bind a record of effects in a do
 *
 * @ets_data_first bindAll_
 */

export function bindAll(r, __trace) {
  // @ts-expect-error
  return s => bindAll_(s, r, __trace);
}
/**
 * Bind a record of effects in a do
 */

export function bindAll_(s, r, __trace) {
  return chain_(s, k => map_(forEach_(R.collect_(r(k), (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a])), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }), __trace);
}
/**
 * Bind a record of effects, in parallel, in a do
 *
 * @ets_data_first bindAllPar_
 */

export function bindAllPar(r, __trace) {
  // @ts-expect-error
  return s => bindAllPar_(s, r, __trace);
}
/**
 * Bind a record of effects, in parallel, in a do
 */

export function bindAllPar_(s, r, __trace) {
  return chain_(s, k => map_(forEachPar_(R.collect_(r(k), (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a])), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }), __trace);
}
/**
 * Bind a record of effects, in parallel (up to N fibers), in a do
 *
 * @ets_data_first bindAllParN_
 */

export function bindAllParN(n, r, __trace) {
  // @ts-expect-error
  return s => bindAllParN_(s, n, r, __trace);
}
/**
 * Bind a record of effects, in parallel (up to N fibers), in a do
 */

export function bindAllParN_(s, n, r, __trace) {
  return chain_(s, k => map_(forEachParN_(R.collect_(r(k), (k, v) => [k, v]), n, ([_, e]) => map_(e, a => [_, a])), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }), __trace);
}
//# sourceMappingURL=bindAll.mjs.map