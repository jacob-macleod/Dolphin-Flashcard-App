// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as BroadcastedQueues from "./broadcastedQueues.mjs";
import * as FlattenTake from "./flattenTake.mjs";
import * as FromQueueWithShutdown from "./fromQueueWithShutdown.mjs";
/**
 * Fan out the stream, producing a list of streams that have the same
 * elements as this stream. The driver stream will only ever advance the
 * `maximumLag` chunks before the slowest downstream stream.
 */

export function broadcast_(self, n, maximumLag) {
  return M.map_(BroadcastedQueues.broadcastedQueues_(self, n, maximumLag), CK.map(_ => FlattenTake.flattenTake(FromQueueWithShutdown.fromQueueWithShutdown_(_))));
}
/**
 * Fan out the stream, producing a list of streams that have the same
 * elements as this stream. The driver stream will only ever advance the
 * `maximumLag` chunks before the slowest downstream stream.
 *
 * @ets_data_first broadcast_
 */

export function broadcast(n, maximumLag) {
  return self => broadcast_(self, n, maximumLag);
}
//# sourceMappingURL=broadcast.mjs.map