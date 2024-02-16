// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as ToQueueOfElements from "./toQueueOfElements.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 */

export function buffer_(self, capacity) {
  const queue = ToQueueOfElements.toQueueOfElements_(self, capacity);
  return new C.Stream(CH.managed_(queue, queue => {
    const process = CH.chain_(CH.fromEffect(Q.take(queue)), Ex.fold(_ => O.fold_(CS.flipCauseOption(_), () => CH.end(undefined), _ => CH.failCause(_)), value => CH.zipRight_(CH.write(CK.single(value)), process)));
    return process;
  }));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a queue.
 *
 * @ets_data_first buffer_
 */

export function buffer(capacity) {
  return self => buffer_(self, capacity);
}
//# sourceMappingURL=buffer.mjs.map