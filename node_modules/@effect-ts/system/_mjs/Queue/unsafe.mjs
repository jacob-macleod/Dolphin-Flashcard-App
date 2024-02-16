// ets_tracing: off
import { None } from "../Fiber/id.mjs";
import { AtomicBoolean } from "../Support/AtomicBoolean/index.mjs";
import { Bounded, Unbounded } from "../Support/MutableQueue/index.mjs";
import { BackPressureStrategy, unsafeCreate } from "./api.mjs";
import { DroppingStrategy, SlidingStrategy } from "./core.mjs";
import * as P from "./promise.mjs";
/**
 * Unsafely creates a queue
 *
 * @ets_data_first unsafeCreateQueue_
 */

export function unsafeCreateQueue(strategy) {
  return queue => unsafeCreateQueue_(queue, strategy);
}
/**
 * Unsafely creates a queue
 */

export function unsafeCreateQueue_(queue, strategy) {
  return unsafeCreate(queue, new Unbounded(), P.unsafeMake(None), new AtomicBoolean(false), strategy);
}
/**
 * Unsafely creates a sliding queue
 */

export function unsafeMakeSliding(capacity) {
  return unsafeCreateQueue_(new Bounded(capacity), new SlidingStrategy());
}
/**
 * Unsafely creates a unbounded queue
 */

export function unsafeMakeUnbounded() {
  return unsafeCreateQueue_(new Unbounded(), new DroppingStrategy());
}
/**
 * Unsafely creates a dropping queue
 */

export function unsafeMakeDropping(capacity) {
  return unsafeCreateQueue_(new Bounded(capacity), new DroppingStrategy());
}
/**
 * Unsafely creates a bounded queue
 */

export function unsafeMakeBounded(capacity) {
  return unsafeCreateQueue_(new Bounded(capacity), new BackPressureStrategy());
}
//# sourceMappingURL=unsafe.mjs.map