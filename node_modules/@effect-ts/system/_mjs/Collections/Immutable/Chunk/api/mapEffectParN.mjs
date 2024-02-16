import * as forEach from "../../../../Effect/excl-forEach.mjs";
/**
 * Effectfully maps the elements of this chunk in parallel.
 */

export function mapMParEffect_(self, n, f) {
  return forEach.forEachParN_(self, n, f);
}
/**
 * Effectfully maps the elements of this chunk in parallel.
 *
 * @ets_data_first mapMParEffect_
 */

export function mapMParEffect(n, f) {
  return self => mapMParEffect_(self, n, f);
}
//# sourceMappingURL=mapEffectParN.mjs.map