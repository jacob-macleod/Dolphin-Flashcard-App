// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as RunIntoManaged from "./runIntoManaged.mjs";
/**
 * Converts the stream to a sliding managed queue of chunks. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */

export function toQueueSliding_(self, capacity = 2) {
  return M.map_(M.tap_(M.bind_(M.do, "queue", () => T.toManagedRelease_(Q.makeSliding(capacity), Q.shutdown)), ({
    queue
  }) => M.fork(RunIntoManaged.runIntoManaged_(self, queue))), ({
    queue
  }) => queue);
}
/**
 * Converts the stream to a sliding managed queue of chunks. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 *
 * @ets_data_first toQueueSliding_
 */

export function toQueueSliding(capacity = 2) {
  return self => toQueueSliding_(self, capacity);
}
//# sourceMappingURL=toQueueSliding.mjs.map