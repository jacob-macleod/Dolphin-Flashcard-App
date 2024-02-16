import { collect_ } from "./collect.mjs";
/**
 * Filter out optional values
 */

export function compact(fa) {
  return collect_(fa, x => x);
}
//# sourceMappingURL=compact.mjs.map