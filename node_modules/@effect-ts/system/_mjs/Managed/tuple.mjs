import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { accessCallTrace } from "../Tracing/index.mjs";
import { map_ } from "./core.mjs";
import { collectAll, collectAllPar, collectAllParN_ } from "./methods/api.mjs";
/**
 * Like `forEach` + `identity` with a tuple type
 *
 * @ets_trace call
 */

export function tuple(...t) {
  const trace = accessCallTrace();
  return map_(collectAll(t, trace), x => Tp.tuple(...x));
}
/**
 * Like tuple but parallel, same as `forEachPar` + `identity` with a tuple type
 */

export function tuplePar(...t) {
  return map_(collectAllPar(t), x => Tp.tuple(...x));
}
/**
 * Like tuplePar but uses at most n fibers concurrently,
 * same as `forEachParN` + `identity` with a tuple type
 */

export function tupleParN(n) {
  return (...t) => map_(collectAllParN_(t, n, accessCallTrace()), x => Tp.tuple(...x));
}
//# sourceMappingURL=tuple.mjs.map