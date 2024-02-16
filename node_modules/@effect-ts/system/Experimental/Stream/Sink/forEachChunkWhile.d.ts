import type * as CK from "../../../Collections/Immutable/Chunk/index.js";
import type * as T from "../../../Effect/index.js";
import * as C from "./core.js";
/**
 * A sink that executes the provided effectful function for every chunk fed to it
 * until `f` evaluates to `false`.
 */
export declare function forEachChunkWhile<R, ErrIn, ErrOut, In>(f: (_in: CK.Chunk<In>) => T.Effect<R, ErrOut, boolean>): C.Sink<R, ErrIn, In, ErrIn | ErrOut, unknown, void>;
//# sourceMappingURL=forEachChunkWhile.d.ts.map