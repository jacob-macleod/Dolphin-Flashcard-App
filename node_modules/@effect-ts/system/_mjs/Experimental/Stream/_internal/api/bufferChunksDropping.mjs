import * as T from "../../../../Effect/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as C from "../core.mjs";
import * as BufferSignal from "./_internal/bufferSignal.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a dropping queue.
 */

export function bufferChunksDropping_(self, capacity) {
  const queue = T.toManagedRelease_(Q.makeDropping(capacity), Q.shutdown);
  return new C.Stream(BufferSignal.bufferSignal(queue, self.channel));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a dropping queue.
 *
 * @ets_data_first bufferChunksDropping_
 */

export function bufferChunksDropping(capacity) {
  return self => bufferChunksDropping_(self, capacity);
}
//# sourceMappingURL=bufferChunksDropping.mjs.map