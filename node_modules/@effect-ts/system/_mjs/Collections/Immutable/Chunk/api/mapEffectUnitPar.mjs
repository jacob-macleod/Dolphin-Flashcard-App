import * as forEach from "../../../../Effect/excl-forEach.mjs";
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 */

export function mapEffectUnitParN_(self, n, f) {
  return forEach.forEachUnitParN_(self, n, f);
}
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 *
 * @ets_data_first mapEffectUnitParN_
 */

export function mapEffectUnitParN(n, f) {
  return self => mapEffectUnitParN_(self, n, f);
}
//# sourceMappingURL=mapEffectUnitPar.mjs.map