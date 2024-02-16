import type * as CL from "../../../../Clock/index.js";
import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as C from "../core.js";
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` function.
 */
export declare function throttleEnforce_<R, E, A>(self: C.Stream<R, E, A>, units: number, duration: number, costFn: (c: CK.Chunk<A>) => number, burst?: number): C.Stream<CL.HasClock & R, E, A>;
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` function.
 *
 * @ets_data_first throttleEnforce_
 */
export declare function throttleEnforce<A>(units: number, duration: number, costFn: (c: CK.Chunk<A>) => number, burst?: number): <R, E>(self: C.Stream<R, E, A>) => C.Stream<CL.HasClock & R, E, A>;
//# sourceMappingURL=throttleEnforce.d.ts.map