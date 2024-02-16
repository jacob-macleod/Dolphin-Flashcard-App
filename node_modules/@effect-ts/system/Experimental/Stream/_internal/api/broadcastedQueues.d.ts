import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as H from "../../../../Hub/index.js";
import * as M from "../../../../Managed/index.js";
import type * as TK from "../../Take/index.js";
import type * as C from "../core.js";
/**
 * Converts the stream to a managed list of queues. Every value will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */
export declare function broadcastedQueues_<R, E, A>(self: C.Stream<R, E, A>, n: number, maximumLag: number): M.RIO<R, CK.Chunk<H.HubDequeue<unknown, never, TK.Take<E, A>>>>;
/**
 * Converts the stream to a managed list of queues. Every value will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 *
 * Queues can unsubscribe from upstream by shutting down.
 *
 * @ets_data_first broadcastedQueues_
 */
export declare function broadcastedQueues(n: number, maximumLag: number): <R, E, A>(self: C.Stream<R, E, A>) => M.RIO<R, CK.Chunk<H.HubDequeue<unknown, never, TK.Take<E, A>>>>;
//# sourceMappingURL=broadcastedQueues.d.ts.map