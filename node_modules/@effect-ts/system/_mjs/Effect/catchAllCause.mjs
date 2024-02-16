import { foldCauseM_, succeed } from "./core.mjs";
/**
 * Recovers from all errors with provided cause.
 */

export function catchAllCause_(effect, f, __trace) {
  return foldCauseM_(effect, f, succeed, __trace);
}
/**
 * Recovers from all errors with provided cause.
 *
 * @ets_data_first catchAllCause_
 */

export function catchAllCause(f, __trace) {
  return effect => catchAllCause_(effect, f, __trace);
}
//# sourceMappingURL=catchAllCause.mjs.map