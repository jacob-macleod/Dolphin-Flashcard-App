import * as SK from "../../Sink/index.mjs";
import * as Transduce from "./transduce.mjs";
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 */

export function grouped_(self, chunkSize) {
  return Transduce.transduce_(self, SK.collectAllN(chunkSize));
}
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 *
 * @ets_data_first grouped_
 */

export function grouped(chunkSize) {
  return self => grouped_(self, chunkSize);
}
//# sourceMappingURL=grouped.mjs.map