import * as CL from "../../Clock/index.js";
import type * as A from "../../Collections/Immutable/Chunk/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 *
 * @ets_data_first throttleEnforceM_
 */
export declare function throttleEnforceM<O, R1, E1>(costFn: (c: A.Chunk<O>) => T.Effect<R1, E1, number>, units: number, duration: number, burst?: number): <R, E>(self: Stream<R, E, O>) => Stream<R & R1 & CL.HasClock, E1 | E, O>;
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 */
export declare function throttleEnforceM_<R, E, O, R1, E1>(self: Stream<R, E, O>, costFn: (c: A.Chunk<O>) => T.Effect<R1, E1, number>, units: number, duration: number, burst?: number): Stream<R & R1 & CL.HasClock, E | E1, O>;
//# sourceMappingURL=throttleEnforceM.d.ts.map