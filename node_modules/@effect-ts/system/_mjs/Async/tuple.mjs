import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { map_ } from "./core.mjs";
import { collectAll, collectAllPar } from "./excl-forEach.mjs";
/**
 * Like `forEach` + `identity` with a tuple type
 *
 * @ets_trace call
 */

export function tuple(...t) {
  return map_(collectAll(t), x => Tp.tuple(...x));
}
/**
 * Like sequenceT but parallel, same as `forEachPar` + `identity` with a tuple type
 *
 * @ets_trace call
 */

export function tuplePar(...t) {
  return map_(collectAllPar(t), x => Tp.tuple(...x));
}
//# sourceMappingURL=tuple.mjs.map