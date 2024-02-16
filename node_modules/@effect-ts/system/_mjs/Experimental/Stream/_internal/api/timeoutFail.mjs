import * as Fail from "./fail.mjs";
import * as TimeoutTo from "./timeoutTo.mjs";
/**
 * Fails the stream with given error if it does not produce a value after d duration.
 */

export function timeoutFail_(self, e, d) {
  return TimeoutTo.timeoutTo_(self, d, Fail.fail(e));
}
/**
 * Fails the stream with given error if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutFail_
 */

export function timeoutFail(e, d) {
  return self => timeoutFail_(self, e, d);
}
//# sourceMappingURL=timeoutFail.mjs.map