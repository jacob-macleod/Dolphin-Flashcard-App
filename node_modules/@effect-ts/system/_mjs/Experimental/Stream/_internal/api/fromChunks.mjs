import * as Chain from "./chain.mjs";
import * as FromChunk from "./fromChunk.mjs";
import * as FromIterable from "./fromIterable.mjs";
/**
 * Creates a stream from an arbitrary number of chunks.
 */

export function fromChunks(...chunks) {
  return Chain.chain_(FromIterable.fromIterable(chunks), _ => FromChunk.fromChunk(_));
}
//# sourceMappingURL=fromChunks.mjs.map