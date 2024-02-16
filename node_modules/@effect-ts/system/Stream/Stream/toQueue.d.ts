import * as Q from "../../Queue/index.js";
import * as M from "../_internal/managed.js";
import type * as TK from "../Take/index.js";
import type { Stream } from "./definitions.js";
/**
 * Converts the stream to a managed queue of chunks. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */
export declare function toQueue_<R, E, O>(self: Stream<R, E, O>, capacity: number): M.Managed<R, never, Q.Dequeue<TK.Take<E, O>>>;
/**
 * Converts the stream to a managed queue of chunks. After the managed queue is used,
 * the queue will never again produce values and should be discarded.
 */
export declare function toQueue(capacity: number): <R, E, O>(self: Stream<R, E, O>) => M.Managed<R, never, Q.Dequeue<TK.Take<E, O>>>;
//# sourceMappingURL=toQueue.d.ts.map