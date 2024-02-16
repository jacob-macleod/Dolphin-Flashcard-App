// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as RunIntoManaged from "./runIntoManaged.mjs";
/**
 * Converts the stream into an unbounded managed queue. After the managed queue
 * is used, the queue will never again produce values and should be discarded.
 */

export function toQueueUnbounded(self) {
  return M.map_(M.tap_(M.bind_(M.do, "queue", () => T.toManagedRelease_(Q.makeUnbounded(), Q.shutdown)), ({
    queue
  }) => M.fork(RunIntoManaged.runIntoManaged_(self, queue))), ({
    queue
  }) => queue);
}
//# sourceMappingURL=toQueueUnbounded.mjs.map