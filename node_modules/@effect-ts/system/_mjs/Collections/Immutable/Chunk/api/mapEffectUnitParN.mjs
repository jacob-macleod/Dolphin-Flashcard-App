import * as forEach from "../../../../Effect/excl-forEach.mjs";
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 */

export function mapEffectUnitPar_(self, f) {
  return forEach.forEachUnitPar_(self, f);
}
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 *
 * @ets_data_first mapEffectUnitPar_
 */

export function mapEffectUnitPar(f) {
  return self => mapEffectUnitPar_(self, f);
}
//# sourceMappingURL=mapEffectUnitParN.mjs.map