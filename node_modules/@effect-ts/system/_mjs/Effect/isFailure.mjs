import { fold_ } from "./fold.mjs";
/**
 * Returns whether this effect is a failure.
 */

export function isFailure(self, __trace) {
  return fold_(self, () => true, () => false, __trace);
}
//# sourceMappingURL=isFailure.mjs.map