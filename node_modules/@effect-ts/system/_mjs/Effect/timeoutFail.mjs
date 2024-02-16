import { succeed, suspend } from "./core.mjs";
import { fail } from "./fail.mjs";
import { flatten } from "./flatten.mjs";
import { timeoutTo_ } from "./timeoutTo.mjs";
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified error.
 *
 * @ets_data_first timeoutFail_
 */

export function timeoutFail(d, e, __trace) {
  return self => timeoutFail_(self, d, e, __trace);
}
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified error.
 */

export function timeoutFail_(self, d, e, __trace) {
  return flatten(timeoutTo_(self, d, suspend(() => fail(e())), succeed, __trace));
}
//# sourceMappingURL=timeoutFail.mjs.map