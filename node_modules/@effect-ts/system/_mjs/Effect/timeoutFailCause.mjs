import { halt, succeed, suspend } from "./core.mjs";
import { flatten } from "./flatten.mjs";
import { timeoutTo_ } from "./timeoutTo.mjs";
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified failure.
 */

export function timeoutFailCause_(self, cause, d, __trace) {
  return flatten(timeoutTo_(self, d, suspend(() => halt(cause())), _ => succeed(_), __trace));
}
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified failure.
 *
 * @ets_data_first timeoutFailCause_
 */

export function timeoutFailCause(cause, d, __trace) {
  return self => timeoutFailCause_(self, cause, d, __trace);
}
//# sourceMappingURL=timeoutFailCause.mjs.map