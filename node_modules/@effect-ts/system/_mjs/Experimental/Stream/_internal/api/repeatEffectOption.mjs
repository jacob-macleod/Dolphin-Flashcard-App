// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as RepeatEffectChunkOption from "./repeatEffectChunkOption.mjs";
/**
 * Creates a stream from an effect producing values of type `A` until it fails with None.
 */

export function repeatEffectOption(fa) {
  return RepeatEffectChunkOption.repeatEffectChunkOption(T.map_(fa, CK.single));
}
//# sourceMappingURL=repeatEffectOption.mjs.map