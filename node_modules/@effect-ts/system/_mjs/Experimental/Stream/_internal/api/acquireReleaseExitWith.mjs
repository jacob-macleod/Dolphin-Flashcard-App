import * as M from "../../../../Managed/index.mjs";
import * as Managed from "./managed.mjs";
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */

export function acquireReleaseExitWith_(acquire, release) {
  return Managed.managed(M.makeExit_(acquire, release));
}
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 *
 * @ets_data_first acquireReleaseExitWith_
 */

export function acquireReleaseExitWith(release) {
  return acquire => acquireReleaseExitWith_(acquire, release);
}
//# sourceMappingURL=acquireReleaseExitWith.mjs.map