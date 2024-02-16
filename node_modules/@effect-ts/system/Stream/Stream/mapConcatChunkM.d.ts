import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */
export declare function mapConcatChunkM_<R, R2, E, E2, O, O2>(self: Stream<R, E, O>, f: (_: O) => T.Effect<R2, E2, A.Chunk<O2>>): Stream<R & R2, E | E2, O2>;
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */
export declare function mapConcatChunkM<R2, E2, O, O2>(f: (_: O) => T.Effect<R2, E2, A.Chunk<O2>>): <R, E>(self: Stream<R, E, O>) => Stream<R & R2, E2 | E, O2>;
//# sourceMappingURL=mapConcatChunkM.d.ts.map