// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as MapConcatChunk from "./mapConcatChunk.mjs";
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 */

export function mapConcat_(self, f) {
  return MapConcatChunk.mapConcatChunk_(self, a => CK.from(f(a)));
}
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 *
 * @ets_data_first mapConcat_
 */

export function mapConcat(f) {
  return self => mapConcat_(self, f);
}
//# sourceMappingURL=mapConcat.mjs.map