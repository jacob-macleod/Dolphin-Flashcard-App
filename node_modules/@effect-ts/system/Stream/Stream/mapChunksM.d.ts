import type * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Effectfully transforms the chunks emitted by this stream.
 */
export declare function mapChunksM_<R, E, E2, O, O2, R2>(self: Stream<R, E, O>, f: (_: Chunk.Chunk<O>) => T.Effect<R2, E2, Chunk.Chunk<O2>>): Stream<R & R2, E2 | E, O2>;
/**
 * Effectfully transforms the chunks emitted by this stream.
 */
export declare function mapChunksM<E2, O, O2, R2>(f: (_: Chunk.Chunk<O>) => T.Effect<R2, E2, Chunk.Chunk<O2>>): <R, E>(self: Stream<R, E, O>) => Stream<R & R2, E2 | E, O2>;
//# sourceMappingURL=mapChunksM.d.ts.map