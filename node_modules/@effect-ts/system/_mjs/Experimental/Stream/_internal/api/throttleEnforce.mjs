import * as T from "../../../../Effect/index.mjs";
import * as ThrottleEnforceEffect from "./throttleEnforceEffect.mjs";
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` function.
 */

export function throttleEnforce_(self, units, duration, costFn, burst = 0) {
  return ThrottleEnforceEffect.throttleEnforceEffect_(self, units, duration, as => T.succeed(costFn(as)), burst);
}
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` function.
 *
 * @ets_data_first throttleEnforce_
 */

export function throttleEnforce(units, duration, costFn, burst = 0) {
  return self => throttleEnforce_(self, units, duration, costFn, burst);
}
//# sourceMappingURL=throttleEnforce.mjs.map