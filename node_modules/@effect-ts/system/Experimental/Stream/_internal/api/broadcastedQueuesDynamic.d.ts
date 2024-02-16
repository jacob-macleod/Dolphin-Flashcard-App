import * as H from "../../../../Hub/index.js";
import * as M from "../../../../Managed/index.js";
import type * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Converts the stream to a managed dynamic amount of queues. Every chunk will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */
export declare function broadcastedQueuesDynamic_<R, E, A>(self: C.Stream<R, E, A>, maximumLag: number): M.RIO<R, M.UIO<H.HubDequeue<unknown, never, TK.Take<E, A>>>>;
/**
 * Converts the stream to a managed dynamic amount of queues. Every chunk will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 *
 * Queues can unsubscribe from upstream by shutting down.
 *
 * @ets_data_first broadcastedQueuesDynamic_
 */
export declare function broadcastedQueuesDynamic(maximumLag: number): <R, E, A>(self: C.Stream<R, E, A>) => M.RIO<R, M.UIO<H.HubDequeue<unknown, never, TK.Take<E, A>>>>;
//# sourceMappingURL=broadcastedQueuesDynamic.d.ts.map