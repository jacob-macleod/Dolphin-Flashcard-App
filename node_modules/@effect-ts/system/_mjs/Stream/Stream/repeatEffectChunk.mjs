// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../_internal/effect.mjs";
import { repeatEffectChunkOption } from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from an effect producing chunks of `A` values which repeats forever.
 */

export function repeatEffectChunk(fa) {
  return repeatEffectChunkOption(T.map_(fa, A.single));
}
//# sourceMappingURL=repeatEffectChunk.mjs.map