// ets_tracing: off
import "../../Operator/index.mjs";
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../Effect/index.mjs";
import * as P from "../../Promise/index.mjs";
/**
 * Unsafely completes a promise with the specified value.
 */

export function unsafeCompletePromise(promise, a) {
  P.unsafeDone(T.succeed(a))(promise);
}
/**
 * Unsafely offers the specified values to a queue.
 */

export function unsafeOfferAll(queue, as) {
  return queue.offerAll(as);
}
/**
 * Unsafely polls all values from a queue.
 */

export function unsafePollAllQueue(queue) {
  return queue.pollUpTo(Number.MAX_SAFE_INTEGER);
}
/**
 * Unsafely polls all values from a subscription.
 */

export function unsafePollAllSubscription(subscription) {
  return subscription.pollUpTo(Number.MAX_SAFE_INTEGER);
}
/**
 * Unsafely polls the specified number of values from a subscription.
 */

export function unsafePollN(subscription, max) {
  return subscription.pollUpTo(max);
}
/**
 * Unsafely publishes the specified values to a hub.
 */

export function unsafePublishAll(hub, as) {
  return hub.publishAll(as);
}
/**
 * Unsafely removes the specified item from a queue.
 */

export function unsafeRemove(queue, a) {
  unsafeOfferAll(queue, Chunk.filter_(unsafePollAllQueue(queue), _ => _ !== a));
}
//# sourceMappingURL=unsafe.mjs.map