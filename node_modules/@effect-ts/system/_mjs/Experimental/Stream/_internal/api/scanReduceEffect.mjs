// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as MapAccumEffect from "./mapAccumEffect.mjs";
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanEffect`.
 */

export function scanReduceEffect_(self, f) {
  return MapAccumEffect.mapAccumEffect_(self, O.emptyOf(), (s, a) => O.fold_(s, () => T.succeed(Tp.tuple(O.some(a), a)), a1 => T.map_(f(a1, a), a2 => Tp.tuple(O.some(a2), a2))));
}
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanEffect`.
 *
 * @ets_data_first scanReduceEffect_
 */

export function scanReduceEffect(f) {
  return self => scanReduceEffect_(self, f);
}
//# sourceMappingURL=scanReduceEffect.mjs.map