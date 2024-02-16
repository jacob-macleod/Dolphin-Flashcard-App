// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { mapChunks_ } from "./mapChunks.mjs";
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 */

export function mapConcat_(self, f) {
  return mapChunks_(self, o => A.chain_(o, o => A.from(f(o))));
}
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 */

export function mapConcat(f) {
  return self => mapConcat_(self, f);
}
//# sourceMappingURL=mapConcat.mjs.map