// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import * as catchAll from "./catchAll.mjs";
import { fail } from "./fail.mjs";
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 *
 * @ets_data_first orElseOptional_
 */

export function orElseOptional(that, __trace) {
  return self => orElseOptional_(self, that, __trace);
}
/**
 * Returns an effect that will produce the value of this effect, unless it
 * fails with the `None` value, in which case it will produce the value of
 * the specified effect.
 */

export function orElseOptional_(self, that, __trace) {
  return catchAll.catchAll_(self, O.fold(that, x => fail(O.some(x))), __trace);
}
//# sourceMappingURL=orElseOptional.mjs.map