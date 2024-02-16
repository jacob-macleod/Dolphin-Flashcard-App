import * as CL from "../../../../Clock/index.js";
import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 */
export declare function throttleEnforceEffect_<R, R1, E, E1, A>(self: C.Stream<R, E, A>, units: number, duration: number, costFn: (c: CK.Chunk<A>) => T.Effect<R1, E1, number>, burst?: number): C.Stream<CL.HasClock & R & R1, E | E1, A>;
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 *
 * @ets_data_first throttleEnforceEffect_
 */
export declare function throttleEnforceEffect<R1, E1, A>(units: number, duration: number, costFn: (c: CK.Chunk<A>) => T.Effect<R1, E1, number>, burst?: number): <R, E>(self: C.Stream<R, E, A>) => C.Stream<CL.HasClock & R & R1, E1 | E, A>;
//# sourceMappingURL=throttleEnforceEffect.d.ts.map