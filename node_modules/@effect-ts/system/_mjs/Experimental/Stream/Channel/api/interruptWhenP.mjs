// ets_tracing: off
import * as P from "../../../../Promise/index.mjs";
import * as InterruptWhen from "./interruptWhen.mjs";
/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified promise is completed. If the promise is completed before the underlying channel is
 * done, then the returned channel will yield the value of the promise. Otherwise, if the
 * underlying channel finishes first, then the returned channel will yield the value of the
 * underlying channel.
 */

export function interruptWhenP_(self, promise) {
  return InterruptWhen.interruptWhen_(self, P.await(promise));
}
/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified promise is completed. If the promise is completed before the underlying channel is
 * done, then the returned channel will yield the value of the promise. Otherwise, if the
 * underlying channel finishes first, then the returned channel will yield the value of the
 * underlying channel.
 *
 * @ets_data_first interruptWhenP_
 */

export function interruptWhenP(promise) {
  return self => interruptWhenP_(self, promise);
}
//# sourceMappingURL=interruptWhenP.mjs.map