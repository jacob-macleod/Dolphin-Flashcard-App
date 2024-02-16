import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { accessCallTrace } from "../Tracing/index.mjs";
import { collectAll, collectAllPar, collectAllParN_ } from "./excl-forEach.mjs";
import { map_ } from "./map.mjs";
/**
 * Like `forEach` + `identity` with a tuple type
 *
 * @ets_trace call
 */

export function tuple(...t) {
  return map_(collectAll(t, accessCallTrace()), x => Tp.tuple(...x));
}
/**
 * Like sequenceT but parallel, same as `forEachPar` + `identity` with a tuple type
 *
 * @ets_trace call
 */

export function tuplePar(...t) {
  return map_(collectAllPar(t, accessCallTrace()), x => Tp.tuple(...x));
}
/**
 * Like sequenceTPar but uses at most n fibers concurrently,
 * same as `forEachParN` + `identity` with a tuple type
 */

export function tupleParN(n) {
  return (
    /**
     * @ets_trace call
     */
    (...t) => map_(collectAllParN_(t, n, accessCallTrace()), x => Tp.tuple(...x))
  );
}
//# sourceMappingURL=tuple.mjs.map