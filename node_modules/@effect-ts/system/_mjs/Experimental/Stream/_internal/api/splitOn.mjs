// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as Map from "./map.mjs";
import * as MapChunks from "./mapChunks.mjs";
import * as SplitOnChunk from "./splitOnChunk.mjs";
/**
 * Splits strings on a delimiter.
 */

export function splitOn_(self, delimiter) {
  return Map.map_(SplitOnChunk.splitOnChunk_(MapChunks.mapChunks_(Map.map_(self, str => CK.from(str)), CK.flatten), CK.from(delimiter)), _ => [..._].join(""));
}
/**
 * Splits strings on a delimiter.
 *
 * @ets_data_first splitOn_
 */

export function splitOn(delimiter) {
  return self => splitOn_(self, delimiter);
}
//# sourceMappingURL=splitOn.mjs.map