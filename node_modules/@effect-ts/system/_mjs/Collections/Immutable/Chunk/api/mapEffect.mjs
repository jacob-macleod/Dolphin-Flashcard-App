import * as forEach from "../../../../Effect/excl-forEach.mjs";
/**
 * Effectfully maps the elements of this chunk.
 */

export function mapEffect_(self, f) {
  return forEach.forEach_(self, f);
}
/**
 * Effectfully maps the elements of this chunk.
 *
 * @ets_data_first mapEffect_
 */

export function mapEffect(f) {
  return self => mapEffect_(self, f);
}
//# sourceMappingURL=mapEffect.mjs.map