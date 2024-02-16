import { chain_, foldCauseM_, halt, succeed } from "./core.mjs";
/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 *
 * @ets_data_first tapCause_
 */

export function tapCause(f, __trace) {
  return effect => tapCause_(effect, f, __trace);
}
/**
 * Returns an effect that effectually "peeks" at the cause of the failure of
 * this effect.
 */

export function tapCause_(effect, f, __trace) {
  return foldCauseM_(effect, c => chain_(f(c), () => halt(c)), succeed, __trace);
}
//# sourceMappingURL=tapCause.mjs.map