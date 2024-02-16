import * as ContramapEffect from "./contramapEffect.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Effectfully transforms both inputs and result of this sink using the provided functions.
 */

export function dimapEffect_(self, f, g) {
  return MapEffect.mapEffect_(ContramapEffect.contramapEffect_(self, f), g);
}
/**
 * Effectfully transforms both inputs and result of this sink using the provided functions.
 *
 * @ets_data_first dimapEffect_
 */

export function dimapEffect(f, g) {
  return self => dimapEffect_(self, f, g);
}
//# sourceMappingURL=dimapEffect.mjs.map