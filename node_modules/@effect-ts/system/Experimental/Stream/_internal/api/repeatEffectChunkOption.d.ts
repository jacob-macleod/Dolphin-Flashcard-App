import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as T from "../../../../Effect/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from an effect producing chunks of `A` values until it fails with None.
 */
export declare function repeatEffectChunkOption<R, E, A>(fa: T.Effect<R, O.Option<E>, CK.Chunk<A>>): C.Stream<R, E, A>;
//# sourceMappingURL=repeatEffectChunkOption.d.ts.map