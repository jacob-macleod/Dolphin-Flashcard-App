import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as C from "../core.js";
/**
 * Performs a filter and map in a single step.
 */
export declare function splitOnChunk_<R, E, A>(self: C.Stream<R, E, A>, delimiter: CK.Chunk<A>): C.Stream<R, E, CK.Chunk<A>>;
/**
 * Performs a filter and map in a single step.
 *
 * @ets_data_first splitOnChunk_
 */
export declare function splitOnChunk<A>(delimiter: CK.Chunk<A>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, CK.Chunk<A>>;
//# sourceMappingURL=splitOnChunk.d.ts.map