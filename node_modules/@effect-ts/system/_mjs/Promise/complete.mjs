import { to } from "../Effect/to.mjs";
/**
 * Completes the promise with the result of the specified effect. If the
 * promise has already been completed, the method will produce false.
 *
 * Note that `Promise.completeWith` will be much faster, so consider using
 * that if you do not need to memoize the result of the specified effect.
 */

export function complete(e) {
  return promise => to(promise)(e);
}
//# sourceMappingURL=complete.mjs.map