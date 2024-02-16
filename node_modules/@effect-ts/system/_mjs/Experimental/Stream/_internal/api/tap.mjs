// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Adds an effect to consumption of every element of the stream.
 */

export function tap_(self, f) {
  return MapEffect.mapEffect_(self, a => T.as_(f(a), a));
}
/**
 * Adds an effect to consumption of every element of the stream.
 *
 * @ets_data_first tap_
 */

export function tap(f) {
  return self => tap_(self, f);
}
//# sourceMappingURL=tap.mjs.map