import type { HasClock } from "../../Clock/index.js";
import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type { Stream } from "./definitions.js";
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` function.
 *
 * @ets_data_first throttleEnforce_
 */
export declare function throttleEnforce<O>(costFn: (c: A.Chunk<O>) => number, units: number, duration: number, burst?: number): <R, E>(self: Stream<R, E, O>) => Stream<R & HasClock, E, O>;
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` function.
 */
export declare function throttleEnforce_<R, E, O>(self: Stream<R, E, O>, costFn: (c: A.Chunk<O>) => number, units: number, duration: number, burst?: number): Stream<R & HasClock, E, O>;
//# sourceMappingURL=throttleEnforce.d.ts.map