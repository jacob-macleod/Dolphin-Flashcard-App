import * as O from "../Option/index.mjs";
import { foldCauseM_, halt, succeed } from "./core.mjs";
/**
 * Recovers from some or all of the error cases with provided cause.
 */

export function catchSomeCause_(effect, f, __trace) {
  return foldCauseM_(effect, c => O.fold_(f(c), () => halt(c), a => a), succeed, __trace);
}
/**
 * Recovers from some or all of the error cases with provided cause.
 *
 * @ets_data_first catchSomeCause_
 */

export function catchSomeCause(f, __trace) {
  return effect => catchSomeCause_(effect, f, __trace);
}
//# sourceMappingURL=catchSomeCause_.mjs.map