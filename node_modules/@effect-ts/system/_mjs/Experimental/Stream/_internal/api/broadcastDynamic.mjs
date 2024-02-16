// ets_tracing: off
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as BroadcastedQueuesDynamic from "./broadcastedQueuesDynamic.mjs";
import * as Chain from "./chain.mjs";
import * as FlattenTake from "./flattenTake.mjs";
import * as FromQueue from "./fromQueue.mjs";
import * as Managed from "./managed.mjs";
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */

export function broadcastDynamic_(self, maximumLag) {
  return M.map_(BroadcastedQueuesDynamic.broadcastedQueuesDynamic_(self, maximumLag), _ => FlattenTake.flattenTake(Chain.chain_(Managed.managed(_), FromQueue.fromQueue())));
}
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 *
 * @ets_data_first broadcastDynamic_
 */

export function broadcastDynamic(maximumLag) {
  return self => broadcastDynamic_(self, maximumLag);
}
//# sourceMappingURL=broadcastDynamic.mjs.map