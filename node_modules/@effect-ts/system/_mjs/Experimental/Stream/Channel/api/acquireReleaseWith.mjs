import * as AcquireReleaseExitWith from "./acquireReleaseExitWith.mjs";
export function acquireReleaseWith_(acquire, use, release) {
  return AcquireReleaseExitWith.acquireReleaseExitWith_(acquire, use, (a, _) => release(a));
}
/**
 * @ets_data_first acquireReleaseWith_
 */

export function acquireReleaseWith(use, release) {
  return acquire => acquireReleaseWith_(acquire, use, release);
}
//# sourceMappingURL=acquireReleaseWith.mjs.map