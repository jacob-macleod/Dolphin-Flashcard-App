import * as forEach from "../../../../Effect/excl-forEach.mjs";
/**
 * Effectfully maps the elements of this chunk in parallel.
 */

export function mapEffectPar_(self, f) {
  return forEach.forEachPar_(self, f);
}
/**
 * Effectfully maps the elements of this chunk in parallel.
 *
 * @ets_data_first mapEffectPar_
 */

export function mapEffectPar(f) {
  return self => mapEffectPar_(self, f);
}
//# sourceMappingURL=mapEffectPar.mjs.map