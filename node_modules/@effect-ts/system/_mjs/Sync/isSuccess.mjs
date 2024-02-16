import { fold_ } from "./core.mjs";
/**
 * Returns whether this effect is a success.
 */

export function isSuccess(self) {
  return fold_(self, () => false, () => true);
}
//# sourceMappingURL=isSuccess.mjs.map