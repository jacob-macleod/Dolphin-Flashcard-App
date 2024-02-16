import * as TR from "../Transducer/index.mjs";
import { aggregate_ } from "./aggregate.mjs";
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 */

export function grouped_(self, chunkSize) {
  return aggregate_(self, TR.collectAllN(chunkSize));
}
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 */

export function grouped(chunkSize) {
  return self => grouped_(self, chunkSize);
}
//# sourceMappingURL=grouped.mjs.map