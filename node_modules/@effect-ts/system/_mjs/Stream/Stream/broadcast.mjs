// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as M from "../_internal/managed.mjs";
import { broadcastedQueues_ } from "./broadcastedQueues.mjs";
import { flattenTake } from "./flattenTake.mjs";
import { fromQueueWithShutdown } from "./fromQueueWithShutdown.mjs";
/**
 * Fan out the stream, producing a list of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */

export function broadcast(n, maximumLag) {
  return self => broadcast_(self, n, maximumLag);
}
/**
 * Fan out the stream, producing a list of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */

export function broadcast_(self, n, maximumLag) {
  return M.map_(broadcastedQueues_(self, n, maximumLag), A.map(q => flattenTake(fromQueueWithShutdown(q))));
}
//# sourceMappingURL=broadcast.mjs.map