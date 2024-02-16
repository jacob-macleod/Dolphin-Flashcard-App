import { fold_ } from "./fold.mjs";
/**
 * Returns whether this effect is a success.
 */

export function isSuccess(self, __trace) {
  return fold_(self, () => false, () => true, __trace);
}
//# sourceMappingURL=isSuccess.mjs.map