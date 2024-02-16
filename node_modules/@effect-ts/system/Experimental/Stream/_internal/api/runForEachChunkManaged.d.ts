import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as T from "../../../../Effect/index.js";
import type * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function runForEachChunkManaged_<R, R1, E, E1, A, Z>(self: C.Stream<R, E, A>, f: (c: CK.Chunk<A>) => T.Effect<R1, E1, Z>): M.Managed<R & R1, E | E1, void>;
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function runForEachChunkManaged<R1, E1, A, Z>(f: (c: CK.Chunk<A>) => T.Effect<R1, E1, Z>): <R, E>(self: C.Stream<R, E, A>) => M.Managed<R & R1, E1 | E, void>;
//# sourceMappingURL=runForEachChunkManaged.d.ts.map