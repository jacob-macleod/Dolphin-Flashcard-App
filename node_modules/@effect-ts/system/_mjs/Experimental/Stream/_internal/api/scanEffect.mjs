// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as Concat from "./concat.mjs";
import * as MapAccumEffect from "./mapAccumEffect.mjs";
import * as Succeed from "./succeed.mjs";
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results of type `S` given an initial S.
 */

export function scanEffect_(self, s, f) {
  return Concat.concat_(Succeed.succeed(s), MapAccumEffect.mapAccumEffect_(self, s, (s, a) => T.map_(f(s, a), s => Tp.tuple(s, s))));
}
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results of type `S` given an initial S.
 *
 * @ets_data_first scanEffect_
 */

export function scanEffect(s, f) {
  return self => scanEffect_(self, s, f);
}
//# sourceMappingURL=scanEffect.mjs.map