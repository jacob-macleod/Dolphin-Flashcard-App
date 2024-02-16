import type * as CL from "../../../../Clock/index.js";
import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as C from "../core.js";
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 */
export declare function groupedWithin_<R, E, A>(self: C.Stream<R, E, A>, chunkSize: number, within: number): C.Stream<R & CL.HasClock, E, CK.Chunk<A>>;
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 *
 * @ets_data_first groupedWithin_
 */
export declare function groupedWithin(chunkSize: number, within: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R & CL.HasClock, E, CK.Chunk<A>>;
//# sourceMappingURL=groupedWithin.d.ts.map