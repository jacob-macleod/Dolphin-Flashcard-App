// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Forever from "./forever.mjs";
import * as FromChunk from "./fromChunk.mjs";
import * as InterleaveWith from "./interleaveWith.mjs";
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 */

export function interleave_(self, that) {
  return InterleaveWith.interleaveWith_(self, that, Forever.forever(FromChunk.fromChunk(CK.from([true, false]))));
}
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 *
 * @ets_data_first interleave_
 */

export function interleave(that) {
  return self => interleave_(self, that);
}
//# sourceMappingURL=interleave.mjs.map