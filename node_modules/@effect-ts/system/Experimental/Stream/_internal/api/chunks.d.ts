import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as C from "../core.js";
/**
 * Exposes the underlying chunks of the stream as a stream of chunks of elements
 */
export declare function chunks<R, E, A>(self: C.Stream<R, E, A>): C.Stream<R, E, CK.Chunk<A>>;
//# sourceMappingURL=chunks.d.ts.map