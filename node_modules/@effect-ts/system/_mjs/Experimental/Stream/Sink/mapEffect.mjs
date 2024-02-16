import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Effectfully transforms this sink's result.
 */

export function mapEffect_(self, f) {
  return new C.Sink(CH.mapEffect_(self.channel, f));
}
/**
 * Effectfully transforms this sink's result.
 *
 * @ets_data_first mapEffect_
 */

export function mapEffect(f) {
  return self => mapEffect_(self, f);
}
//# sourceMappingURL=mapEffect.mjs.map