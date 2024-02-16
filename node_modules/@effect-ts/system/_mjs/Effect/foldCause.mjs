import { foldCauseM_, succeed } from "./core.mjs";
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 */

export function foldCause_(value, failure, success, __trace) {
  return foldCauseM_(value, c => succeed(failure(c)), x => succeed(success(x)), __trace);
}
/**
 * A more powerful version of `fold` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCause_
 */

export function foldCause(failure, success, __trace) {
  return value => foldCause_(value, failure, success, __trace);
}
//# sourceMappingURL=foldCause.mjs.map