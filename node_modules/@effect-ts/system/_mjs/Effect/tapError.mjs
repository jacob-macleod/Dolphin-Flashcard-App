// ets_tracing: off
import { failureOrCause } from "../Cause/index.mjs";
import * as E from "../Either/index.mjs";
import { chain_, foldCauseM_, halt, succeed } from "./core.mjs";
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 */

export function tapError_(self, f, __trace) {
  return foldCauseM_(self, c => E.fold_(failureOrCause(c), e => chain_(f(e), () => halt(c)), _ => halt(c)), succeed, __trace);
}
/**
 * Returns an effect that effectfully "peeks" at the failure of this effect.
 *
 * @ets_data_first tapError_
 */

export function tapError(f, __trace) {
  return self => tapError_(self, f, __trace);
}
//# sourceMappingURL=tapError.mjs.map