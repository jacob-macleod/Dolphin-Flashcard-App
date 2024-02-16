import * as C from "../core.mjs";
export function acquireReleaseOutWith_(acquire, release) {
  return C.acquireReleaseOutExitWith_(acquire, (z, _) => release(z));
}
/**
 * @ets_data_first acquireReleaseOutWith_
 */

export function acquireReleaseOutWith(release) {
  return acquire => acquireReleaseOutWith_(acquire, release);
}
//# sourceMappingURL=acquireReleaseOutWith.mjs.map