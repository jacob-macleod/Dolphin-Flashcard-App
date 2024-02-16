import * as CL from "../../Clock/index.js";
import type * as A from "../../Collections/Immutable/Chunk/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * effectful function.
 */
export declare function throttleShapeM_<O, R1, E1, R, E>(self: Stream<R, E, O>, costFn: (c: A.Chunk<O>) => T.Effect<R1, E1, number>, units: number, duration: number, burst?: number): Stream<CL.HasClock & R1 & R, E | E1, O>;
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * effectful function.
 *
 * @ets_data_first throttleShapeM_
 */
export declare function throttleShapeM<O, R1, E1>(costFn: (c: A.Chunk<O>) => T.Effect<R1, E1, number>, units: number, duration: number, burst?: number): <R, E>(self: Stream<R, E, O>) => Stream<CL.HasClock & R1 & R, E1 | E, O>;
//# sourceMappingURL=throttleShapeM.d.ts.map