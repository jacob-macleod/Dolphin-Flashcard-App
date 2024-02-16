import type * as CK from "../../../Collections/Immutable/Chunk/index.js";
import type * as C from "./core.js";
/**
 * A sink that folds its input chunks with the provided function and initial state.
 * `f` must preserve chunking-invariance.
 */
export declare function foldLeftChunks<Err, In, S>(z: S, f: (s: S, chunk: CK.Chunk<In>) => S): C.Sink<unknown, Err, In, Err, unknown, S>;
//# sourceMappingURL=foldLeftChunks.d.ts.map