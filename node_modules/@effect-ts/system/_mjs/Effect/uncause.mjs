import { isEmpty } from "../Cause/cause.mjs";
import { chain_, halt, unit } from "./core.mjs";
/**
 * When this effect succeeds with a cause, then this method returns a new
 * effect that either fails with the cause that this effect succeeded with,
 * or succeeds with unit, depending on whether the cause is empty.
 *
 * This operation is the opposite of `cause`.
 */

export function uncause(effect, __trace) {
  return chain_(effect, a => isEmpty(a) ? unit : halt(a), __trace);
}
//# sourceMappingURL=uncause.mjs.map