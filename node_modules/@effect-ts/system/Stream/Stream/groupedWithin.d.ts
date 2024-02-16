import type * as CL from "../../Clock/index.js";
import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as H from "../../Has/index.js";
import type { Stream } from "./definitions.js";
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 */
export declare function groupedWithin_<R, E, O>(self: Stream<R, E, O>, chunkSize: number, within: number): Stream<R & H.Has<CL.Clock>, E, A.Chunk<O>>;
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 */
export declare function groupedWithin(chunkSize: number, within: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R & H.Has<CL.Clock>, E, A.Chunk<O>>;
//# sourceMappingURL=groupedWithin.d.ts.map