import { pipe } from "../Function/index.mjs";
import { succeed } from "./core.mjs";
import { die } from "./die.mjs";
import { effectAsync } from "./effectAsync.mjs";
import { fail } from "./fail.mjs";
/**
 * Create an Effect that when executed will construct `promise` and wait for its result,
 * errors will be handled using `onReject`
 */

export function tryCatchPromise(promise, onReject, __trace) {
  return effectAsync(resolve => {
    promise().then(x => resolve(succeed(x))).catch(x => resolve(fail(onReject(x))));
  }, __trace);
}
/**
 * Create an Effect that when executed will construct `promise` and wait for its result,
 * errors will produce failure as `unknown`
 */

export function tryPromise(effect, __trace) {
  return effectAsync(resolve => {
    effect().then(x => resolve(succeed(x))).catch(x => resolve(fail(x)));
  }, __trace);
}
/**
 * Like tryPromise but produces a defect in case of errors
 */

export function promise(effect, __trace) {
  return effectAsync(resolve => {
    effect().then(x => resolve(succeed(x))).catch(x => resolve(die(x)));
  }, __trace);
}
//# sourceMappingURL=promise.mjs.map