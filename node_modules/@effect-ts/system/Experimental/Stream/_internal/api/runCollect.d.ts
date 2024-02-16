import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Runs the stream and collects all of its elements to a chunk.
 */
export declare function runCollect<R, E, A>(self: C.Stream<R, E, A>): T.Effect<R, E, CK.Chunk<A>>;
//# sourceMappingURL=runCollect.d.ts.map