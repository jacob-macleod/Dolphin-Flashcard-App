import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from an effect producing chunks of `A` values which repeats forever.
 */
export declare function repeatEffectChunk<R, E, A>(fa: T.Effect<R, E, CK.Chunk<A>>): C.Stream<R, E, A>;
//# sourceMappingURL=repeatEffectChunk.d.ts.map