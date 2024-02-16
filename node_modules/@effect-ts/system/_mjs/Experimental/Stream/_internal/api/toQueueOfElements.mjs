// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as RunIntoElementsManaged from "./runIntoElementsManaged.mjs";
/**
 * Converts the stream to a managed queue of elements. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */

export function toQueueOfElements_(self, capacity = 2) {
  return M.map_(M.tap_(M.bind_(M.do, "queue", () => T.toManagedRelease_(Q.makeBounded(capacity), Q.shutdown)), ({
    queue
  }) => M.fork(RunIntoElementsManaged.runIntoElementsManaged_(self, queue))), ({
    queue
  }) => queue);
}
/**
 * Converts the stream to a managed queue of elements. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 *
 * @ets_data_first toQueueOfElements_
 */

export function toQueueOfElements(capacity = 2) {
  return self => toQueueOfElements_(self, capacity);
}
//# sourceMappingURL=toQueueOfElements.mjs.map