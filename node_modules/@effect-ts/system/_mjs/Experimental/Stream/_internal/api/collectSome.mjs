import * as Collect from "./collect.mjs";
/**
 * Filters any `None` values.
 */

export function collectSome(self) {
  return Collect.collect_(self, a => a);
}
//# sourceMappingURL=collectSome.mjs.map