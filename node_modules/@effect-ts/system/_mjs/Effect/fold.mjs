// ets_tracing: off
import { succeed } from "./core.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 */

export function fold_(value, failure, success, __trace) {
  return foldM_(value, e => succeed(failure(e)), a => succeed(success(a)), __trace);
}
/**
 * Folds over the failure value or the success value to yield an effect that
 * does not fail, but succeeds with the value returned by the left or right
 * function passed to `fold`.
 *
 * @ets_data_first fold_
 */

export function fold(failure, success, __trace) {
  return value => fold_(value, failure, success, __trace);
}
//# sourceMappingURL=fold.mjs.map