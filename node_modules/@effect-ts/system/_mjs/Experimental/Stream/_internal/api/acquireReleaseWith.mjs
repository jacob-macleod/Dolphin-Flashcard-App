import * as M from "../../../../Managed/index.mjs";
import * as Managed from "./managed.mjs";
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */

export function acquireReleaseWith_(acquire, release) {
  return Managed.managed(M.make_(acquire, release));
}
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 *
 * @ets_data_first acquireReleaseWith_
 */

export function acquireReleaseWith(release) {
  return acquire => acquireReleaseWith_(acquire, release);
}
//# sourceMappingURL=acquireReleaseWith.mjs.map