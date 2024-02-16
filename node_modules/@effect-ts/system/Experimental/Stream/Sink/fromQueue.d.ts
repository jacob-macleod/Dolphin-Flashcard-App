import * as Q from "../../../Queue/index.js";
import type * as C from "./core.js";
/**
 * Create a sink which enqueues each element into the specified queue.
 */
export declare function fromQueue<R, InErr, E, I>(queue: Q.XEnqueue<R, E, I>): C.Sink<R, InErr, I, InErr | E, unknown, void>;
//# sourceMappingURL=fromQueue.d.ts.map