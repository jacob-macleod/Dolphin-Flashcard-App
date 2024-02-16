import * as forEach from "../../../../Effect/excl-forEach.mjs";
/**
 * Effectfully maps the elements of this chunk purely for the effects.
 */

export function mapEffectUnit_(self, f) {
  return forEach.forEachUnit_(self, f);
}
/**
 * Effectfully maps the elements of this chunk purely for the effects.
 *
 * @ets_data_first mapEffectUnit_
 */

export function mapEffectUnit(f) {
  return self => mapEffectUnit_(self, f);
}
//# sourceMappingURL=mapEffectUnit.mjs.map