import * as O from "../Option/index.mjs";
import { effectAsyncOptionBlockingOn } from "./core.mjs";
/**
 * Imports an asynchronous side-effect into a pure `Effect` value. See
 * `effectAsyncOption` for the more expressive variant of this function that
 * can return a value synchronously.
 *
 * The callback function must be called at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */

export function effectAsync(register, __trace) {
  return effectAsyncBlockingOn(register, [], __trace);
}
/**
 * Imports an asynchronous side-effect into a pure `Effect` value. See
 * `effectAsyncOption` for the more expressive variant of this function that
 * can return a value synchronously.
 *
 * The callback function must be called at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */

export function effectAsyncBlockingOn(register, blockingOn, __trace) {
  return effectAsyncOptionBlockingOn(cb => {
    register(cb);
    return O.none;
  }, blockingOn, __trace);
}
//# sourceMappingURL=effectAsync.mjs.map