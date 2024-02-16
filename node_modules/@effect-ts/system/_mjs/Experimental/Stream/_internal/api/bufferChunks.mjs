import * as Q from "../../../../Queue/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as TK from "../../Take/index.mjs";
import * as C from "../core.mjs";
import * as ToQueue from "./toQueue.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 */

export function bufferChunks_(self, capacity) {
  const queue = ToQueue.toQueue_(self, capacity);
  return new C.Stream(CH.managed_(queue, queue => {
    const process = CH.chain_(CH.fromEffect(Q.take(queue)), take => TK.fold_(take, CH.end(undefined), error => CH.failCause(error), value => CH.zipRight_(CH.write(value), process)));
    return process;
  }));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @ets_data_first bufferChunks_
 */

export function bufferChunks(capacity) {
  return self => bufferChunks_(self, capacity);
}
//# sourceMappingURL=bufferChunks.mjs.map