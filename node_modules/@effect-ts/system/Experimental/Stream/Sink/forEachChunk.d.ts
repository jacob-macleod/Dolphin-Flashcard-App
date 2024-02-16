import type * as CK from "../../../Collections/Immutable/Chunk/core.js";
import type * as T from "../../../Effect/index.js";
import type * as C from "./core.js";
/**
 * A sink that executes the provided effectful function for every chunk fed to it.
 */
export declare function forEachChunk<R, ErrIn, Err, In, Z>(f: (c: CK.Chunk<In>) => T.Effect<R, Err, Z>): C.Sink<R, ErrIn, In, ErrIn | Err, unknown, void>;
//# sourceMappingURL=forEachChunk.d.ts.map