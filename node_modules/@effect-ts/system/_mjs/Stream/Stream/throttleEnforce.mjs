import * as T from "../_internal/effect.mjs";
import { throttleEnforceM_ } from "./throttleEnforceM.mjs";
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` function.
 *
 * @ets_data_first throttleEnforce_
 */

export function throttleEnforce(costFn, units, duration, burst = 0) {
  return self => throttleEnforce_(self, costFn, units, duration, burst);
}
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` function.
 */

export function throttleEnforce_(self, costFn, units, duration, burst = 0) {
  return throttleEnforceM_(self, os => T.succeed(costFn(os)), units, duration, burst);
}
//# sourceMappingURL=throttleEnforce.mjs.map