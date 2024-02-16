import { empty } from "../Cause/cause.mjs";
import { foldCauseM_, succeed } from "./core.mjs";
/**
 * Returns an effect that succeeds with the cause of failure of this effect,
 * or `Cause.empty` if the effect did not succeed.
 */

export function cause(effect, __trace) {
  return foldCauseM_(effect, succeed, () => succeed(empty), __trace);
}
//# sourceMappingURL=cause.mjs.map