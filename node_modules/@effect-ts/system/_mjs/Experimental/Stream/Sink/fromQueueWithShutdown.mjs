// ets_tracing: off
import * as T from "../../../Effect/index.mjs";
import * as M from "../../../Managed/index.mjs";
import * as Q from "../../../Queue/index.mjs";
import * as FromQueue from "./fromQueue.mjs";
import * as UnwrapManaged from "./unwrapManaged.mjs";
/**
 * Create a sink which enqueues each element into the specified queue.
 */

export function fromQueueWithShutdown(queue) {
  return UnwrapManaged.unwrapManaged(M.map_(M.make_(T.succeed(queue), Q.shutdown), _ => FromQueue.fromQueue(_)));
}
//# sourceMappingURL=fromQueueWithShutdown.mjs.map