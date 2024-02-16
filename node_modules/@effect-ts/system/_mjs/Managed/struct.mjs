// ets_tracing: off
import * as R from "../Collections/Immutable/Dictionary/index.mjs";
import { chain_, map_ } from "./core.mjs";
import { forEach_, forEachPar_, forEachParN_ } from "./forEach.mjs";
export function struct(r, __trace) {
  return map_(forEach_(R.collect_(r, (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
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
 * @ets_data_first structParN_
 */

export function structParN(n, __trace) {
  // @ts-expect-error
  return r => structParN_(r, n, __trace);
}
export function structParN_(r, n, __trace) {
  return map_(forEachParN_(R.collect_(r, (k, v) => [k, v]), n, ([_, e]) => map_(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return res;
  });
}
/**
 * @ets_data_first bindAll_
 */

export function bindAll(r, __trace) {
  // @ts-expect-error
  return s => bindAll_(s, r, __trace);
}
export function bindAll_(s, r, __trace) {
  return chain_(s, k => map_(forEach_(R.collect_(r(k), (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }));
}
/**
 * @ets_data_first bindAllPar_
 */

export function bindAllPar(r, __trace) {
  // @ts-expect-error
  return s => bindAllPar_(s, r, __trace);
}
export function bindAllPar_(s, r, __trace) {
  return chain_(s, k => map_(forEachPar_(R.collect_(r(k), (k, v) => [k, v]), ([_, e]) => map_(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }));
}
/**
 * @ets_data_first bindAllParN_
 */

export function bindAllParN(n, r, __trace) {
  // @ts-expect-error
  return s => bindAllParN_(s, n, r, __trace);
}
export function bindAllParN_(s, n, r, __trace) {
  return chain_(s, k => map_(forEachParN_(R.collect_(r(k), (k, v) => [k, v]), n, ([_, e]) => map_(e, a => [_, a]), __trace), values => {
    const res = {};

    for (const [k, v] of values) {
      res[k] = v;
    }

    return Object.assign(res, k);
  }));
}
//# sourceMappingURL=struct.mjs.map