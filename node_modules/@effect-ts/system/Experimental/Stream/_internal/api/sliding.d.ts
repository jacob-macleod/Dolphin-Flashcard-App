import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as C from "../core.js";
/**
 * Emits a sliding window of n elements.
 */
export declare function sliding_<R, E, A>(self: C.Stream<R, E, A>, chunkSize: number, stepSize?: number): C.Stream<R, E, CK.Chunk<A>>;
/**
 * Emits a sliding window of n elements.
 *
 * @ets_data_first sliding_
 */
export declare function sliding(chunkSize: number, stepSize?: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, CK.Chunk<A>>;
//# sourceMappingURL=sliding.d.ts.map