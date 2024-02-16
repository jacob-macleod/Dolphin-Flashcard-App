// ets_tracing: off
import { checkTraced, traced, untraced } from "./core.mjs";

function restore(b) {
  return self => b ? traced(self) : untraced(self);
}
/**
 * Makes the effect untraced, but passes it a restore function that can be used to restore
 * the inherited traceability from whatever region the effect is composed into.
 */


export function untracedMask(f) {
  return checkTraced(b => untraced(f(restore(b))));
}
/**
 * Makes the effect traced, but passes it a restore function that can be used to restore
 * the inherited traceability from whatever region the effect is composed into.
 */

export function tracedMask(f) {
  return checkTraced(b => traced(f(restore(b))));
}
//# sourceMappingURL=traceMask.mjs.map