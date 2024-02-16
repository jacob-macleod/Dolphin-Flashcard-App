// ets_tracing: off
import * as R from "../Collections/Immutable/Dictionary/index.mjs";
import { forEach_, forEachPar_, forEachParN_ } from "./excl-forEach.mjs";
import { map_ } from "./map.mjs";
/**
 * Applicative structure
 */

export function struct(r, __trace) {
  return map_(forEach_(R.collect_(r, (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a]), __trace), values => {
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
  return map_(forEachPar_(R.collect_(r, (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
/**
 * Applicative structure processed in parallel with up to N fibers
 *
 * @ets_data_first structParN_
 */

export function structParN(n, __trace) {
  return r => // @ts-expect-error
  structParN_(r, n, __trace);
}
/**
 * Applicative structure processed in parallel with up to N fibers
 */

export function structParN_(r, n, __trace) {
  return map_(forEachParN_(R.collect_(r, (k, v) => [k, v]), n, ([_, e]) => map_(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
//# sourceMappingURL=struct.mjs.map