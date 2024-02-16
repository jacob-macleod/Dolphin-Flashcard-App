// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { intoManaged_ } from "./intoManaged.mjs";
/**
 * Converts the stream to a managed queue of chunks. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */

export function toQueue_(self, capacity) {
  return M.map_(M.tap_(M.bind_(M.do, "queue", () => T.toManagedRelease_(Q.makeBounded(capacity), Q.shutdown)), ({
    queue
  }) => M.fork(intoManaged_(self, queue))), ({
    queue
  }) => queue);
}
/**
 * Converts the stream to a managed queue of chunks. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */

export function toQueue(capacity) {
  return self => toQueue_(self, capacity);
}
//# sourceMappingURL=toQueue.mjs.map