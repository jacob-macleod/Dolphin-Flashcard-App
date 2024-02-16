import { fold_ } from "./core.mjs";
/**
 * Returns whether this effect is a failure.
 */

export function isFailure(self) {
  return fold_(self, () => true, () => false);
}
//# sourceMappingURL=isFailure.mjs.map