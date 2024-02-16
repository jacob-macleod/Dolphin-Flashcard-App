// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as RunIntoManaged from "./runIntoManaged.mjs";
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 */

export function runInto_(self, queue) {
  return M.use_(RunIntoManaged.runIntoManaged_(self, queue), _ => T.unit);
}
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 *
 * @ets_data_first runInto_
 */

export function runInto(queue) {
  return self => runInto_(self, queue);
}
//# sourceMappingURL=runInto.mjs.map