// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { forever } from "./forever.mjs";
import { fromChunk } from "./fromChunk.mjs";
import { interleaveWith_ } from "./interleaveWith.mjs";
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 */

export function interleave_(self, that) {
  return interleaveWith_(self, that, forever(fromChunk(A.from([true, false]))));
}
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 */

export function interleave(that) {
  return self => interleave_(self, that);
}
//# sourceMappingURL=interleave.mjs.map