import * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as XQ from "../../Queue/index.js";
import * as M from "../_internal/managed.js";
import type * as Take from "../Take/index.js";
import type { Stream } from "./definitions.js";
/**
 * Converts the stream to a managed list of queues. Every value will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 * The downstream queues will be provided with chunks in the same order they are returned, so
 * the fastest queue might have seen up to (`maximumLag` + 1) chunks more than the slowest queue if it
 * has a lower index than the slowest queue.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */
export declare function broadcastedQueues(n: number, maximumLag: number): <R, E, O>(self: Stream<R, E, O>) => M.Managed<R, never, A.Chunk<XQ.Dequeue<Take.Take<E, O>>>>;
/**
 * Converts the stream to a managed list of queues. Every value will be replicated to every queue with the
 * slowest queue being allowed to buffer `maximumLag` chunks before the driver is backpressured.
 * The downstream queues will be provided with chunks in the same order they are returned, so
 * the fastest queue might have seen up to (`maximumLag` + 1) chunks more than the slowest queue if it
 * has a lower index than the slowest queue.
 *
 * Queues can unsubscribe from upstream by shutting down.
 */
export declare function broadcastedQueues_<R, E, O>(self: Stream<R, E, O>, n: number, maximumLag: number): M.Managed<R, never, A.Chunk<XQ.Dequeue<Take.Take<E, O>>>>;
//# sourceMappingURL=broadcastedQueues.d.ts.map