import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as RepeatEffectChunkOption from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from an effect producing chunks of `A` values which repeats forever.
 */

export function repeatEffectChunk(fa) {
  return RepeatEffectChunkOption.repeatEffectChunkOption(T.mapError_(fa, O.some));
}
//# sourceMappingURL=repeatEffectChunk.mjs.map