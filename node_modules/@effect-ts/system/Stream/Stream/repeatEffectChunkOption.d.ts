import type * as A from "../../Collections/Immutable/Chunk/index.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Creates a stream from an effect producing chunks of `A` values until it fails with None.
 */
export declare function repeatEffectChunkOption<R, E, A>(fa: T.Effect<R, O.Option<E>, A.Chunk<A>>): Stream<R, E, A>;
//# sourceMappingURL=repeatEffectChunkOption.d.ts.map