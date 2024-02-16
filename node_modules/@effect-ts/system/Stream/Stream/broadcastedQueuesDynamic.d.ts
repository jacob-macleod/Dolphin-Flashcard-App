import type * as Q from "../../Queue/index.js";
import * as M from "../_internal/managed.js";
import type * as Take from "../Take/index.js";
import type { Stream } from "./definitions.js";
/**
 * Converts the stream to a managed dynamic amount of queues. Every chunk will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 * The downstream queues will be provided with chunks in the same order they are returned, so
 * the fastest queue might have seen up to (`maximumLag` + 1) chunks more than the slowest queue if it
 * has a lower index than the slowest queue.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */
export declare function broadcastedQueuesDynamic_<R, E, O>(self: Stream<R, E, O>, maximumLag: number): M.Managed<R, never, M.Managed<unknown, never, Q.Dequeue<Take.Take<E, O>>>>;
/**
 * Converts the stream to a managed dynamic amount of queues. Every chunk will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 * The downstream queues will be provided with chunks in the same order they are returned, so
 * the fastest queue might have seen up to (`maximumLag` + 1) chunks more than the slowest queue if it
 * has a lower index than the slowest queue.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */
export declare function broadcastedQueuesDynamic(maximumLag: number): <R, E, O>(self: Stream<R, E, O>) => M.Managed<R, never, M.Managed<unknown, never, Q.Dequeue<Take.Take<E, O>>>>;
//# sourceMappingURL=broadcastedQueuesDynamic.d.ts.map