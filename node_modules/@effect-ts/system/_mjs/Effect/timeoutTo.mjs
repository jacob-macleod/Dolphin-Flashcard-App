import { pipe } from "../Function/index.mjs";
import * as as from "./as.mjs";
import * as interruption from "./interruption.mjs";
import * as map from "./map.mjs";
import * as race from "./race.mjs";
import * as sleep from "./sleep.mjs";
/**
 * Returns an effect that will timeout this effect, returning either the
 * default value if the timeout elapses before the effect has produced a
 * value; and or returning the result of applying the function `f` to the
 * success value of the effect.
 *
 * If the timeout elapses without producing a value, the running effect
 * will be safely interrupted
 *
 * @ets_data_first timeoutTo_
 */

export function timeoutTo(d, b, f, __trace) {
  return self => timeoutTo_(self, d, b, f);
}
/**
 * Returns an effect that will timeout this effect, returning either the
 * default value if the timeout elapses before the effect has produced a
 * value; and or returning the result of applying the function `f` to the
 * success value of the effect.
 *
 * If the timeout elapses without producing a value, the running effect
 * will be safely interrupted
 */

export function timeoutTo_(self, d, b, f, __trace) {
  return race.raceFirst_(map.map_(self, f), as.as_(interruption.interruptible(sleep.sleep(d)), b), __trace);
}
//# sourceMappingURL=timeoutTo.mjs.map