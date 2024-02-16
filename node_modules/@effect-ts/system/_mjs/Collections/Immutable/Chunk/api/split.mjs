// ets_tracing: off
import * as Chunk from "../core.mjs";
import { concreteId } from "../definition.mjs";
import { forEach_ } from "./forEach.mjs";
/**
 * Splits this chunk into `n` equally sized chunks.
 */

export function split_(self, n) {
  const length = self.length;
  const k = Math.floor(n);
  const quotient = Math.floor(length / k);
  const remainder = length % k;
  let chunks = Chunk.empty();
  let i = 0;
  let chunk = Chunk.empty();
  forEach_(self, a => {
    chunk = Chunk.append_(chunk, a);

    if (i <= remainder && chunk.length > quotient || i > remainder && chunk.length >= quotient) {
      chunks = Chunk.append_(chunks, chunk);
      chunk = Chunk.empty();
    }

    i++;
  });

  if (chunk.length > 0) {
    chunks = Chunk.append_(chunks, chunk);
  }

  return chunks;
}
/**
 * Splits this chunk into `n` equally sized chunks.
 *
 * @ets_data_first split_
 */

export function split(n) {
  return self => split_(self, n);
}
//# sourceMappingURL=split.mjs.map