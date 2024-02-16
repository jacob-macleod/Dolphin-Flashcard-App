// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as MH from "../_internal/mergeHelpers.mjs";
import * as C from "../core.mjs";
import * as MergeWith from "./mergeWith.mjs";
/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified effect completes. If the effect completes successfully before the underlying channel
 * is done, then the returned channel will yield the success value of the effect as its terminal
 * value. On the other hand, if the underlying channel finishes first, then the returned channel
 * will yield the success value of the underlying channel as its terminal value.
 */

export function interruptWhen_(self, io) {
  return MergeWith.mergeWith_(self, C.fromEffect(io), selfDone => MH.done(T.done(selfDone)), ioDone => MH.done(T.done(ioDone)));
}
/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified effect completes. If the effect completes successfully before the underlying channel
 * is done, then the returned channel will yield the success value of the effect as its terminal
 * value. On the other hand, if the underlying channel finishes first, then the returned channel
 * will yield the success value of the underlying channel as its terminal value.
 *
 * @ets_data_first interruptWhen_
 */

export function interruptWhen(io) {
  return self => interruptWhen_(self, io);
}
//# sourceMappingURL=interruptWhen.mjs.map