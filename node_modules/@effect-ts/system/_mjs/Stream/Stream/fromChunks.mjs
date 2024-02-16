import { chain_ } from "./chain.mjs";
import { fromChunk } from "./fromChunk.mjs";
import { fromIterable } from "./fromIterable.mjs";
/**
 * Creates a stream from an array of values
 */

export function fromChunks(...cs) {
  return chain_(fromIterable(cs), fromChunk);
}
//# sourceMappingURL=fromChunks.mjs.map