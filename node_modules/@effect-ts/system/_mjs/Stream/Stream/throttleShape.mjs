import * as T from "../_internal/effect.mjs";
import { throttleShapeM_ } from "./throttleShapeM.mjs";
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * function.
 *
 * @ets_data_first throttleShape_
 */

export function throttleShape(costFn, units, duration, burst = 0) {
  return self => throttleShape_(self, costFn, units, duration, burst);
}
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * function.
 */

export function throttleShape_(self, costFn, units, duration, burst = 0) {
  return throttleShapeM_(self, os => T.succeed(costFn(os)), units, duration, burst);
}
//# sourceMappingURL=throttleShape.mjs.map