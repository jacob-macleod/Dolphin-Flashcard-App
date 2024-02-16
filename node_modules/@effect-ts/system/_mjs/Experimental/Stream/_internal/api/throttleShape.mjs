import * as T from "../../../../Effect/index.mjs";
import * as ThrottleShapeEffect from "./throttleShapeEffect.mjs";
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * function.
 */

export function throttleShape_(self, units, duration, costFn, burst = 0) {
  return ThrottleShapeEffect.throttleShapeEffect_(self, units, duration, os => T.succeed(costFn(os)), burst);
}
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * function.
 *
 * @ets_data_first throttleShape_
 */

export function throttleShape(units, duration, costFn, burst = 0) {
  return self => throttleShape_(self, units, duration, costFn, burst);
}
//# sourceMappingURL=throttleShape.mjs.map