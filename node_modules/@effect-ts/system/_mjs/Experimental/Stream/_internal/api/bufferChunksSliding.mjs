import * as T from "../../../../Effect/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as C from "../core.mjs";
import * as BufferSignal from "./_internal/bufferSignal.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a sliding queue.
 */

export function bufferChunksSliding_(self, capacity) {
  const queue = T.toManagedRelease_(Q.makeSliding(capacity), Q.shutdown);
  return new C.Stream(BufferSignal.bufferSignal(queue, self.channel));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a sliding queue.
 *
 * @ets_data_first bufferChunksSliding_
 */

export function bufferChunksSliding(capacity) {
  return self => bufferChunksSliding_(self, capacity);
}
//# sourceMappingURL=bufferChunksSliding.mjs.map