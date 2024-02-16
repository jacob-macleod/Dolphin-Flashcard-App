import { sandbox } from "./sandbox.mjs";
import { unsandbox } from "./unsandbox.mjs";
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 *
 * @ets_data_first sandboxWith_
 */

export function sandboxWith(f, __trace) {
  return self => sandboxWith_(self, f, __trace);
}
/**
 * Companion helper to `sandbox`. Allows recovery, and partial recovery, from
 * errors and defects alike.
 */

export function sandboxWith_(self, f, __trace) {
  return unsandbox(f(sandbox(self)), __trace);
}
//# sourceMappingURL=sandboxWith.mjs.map