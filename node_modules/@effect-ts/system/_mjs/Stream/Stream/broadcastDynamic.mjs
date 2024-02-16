// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as M from "../_internal/managed.mjs";
import { broadcastedQueuesDynamic_ } from "./broadcastedQueuesDynamic.mjs";
import { chain_ } from "./chain.mjs";
import { flattenTake } from "./flattenTake.mjs";
import { fromQueue } from "./fromQueue.mjs";
import { managed } from "./managed.mjs";
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */

export function broadcastDynamic_(self, maximumLag) {
  return M.map_(broadcastedQueuesDynamic_(self, maximumLag), _ => flattenTake(chain_(managed(_), fromQueue)));
}
/**
 * Fan out the stream, producing a dynamic number of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */

export function broadcastDynamic(maximumLag) {
  return self => broadcastDynamic_(self, maximumLag);
}
//# sourceMappingURL=broadcastDynamic.mjs.map