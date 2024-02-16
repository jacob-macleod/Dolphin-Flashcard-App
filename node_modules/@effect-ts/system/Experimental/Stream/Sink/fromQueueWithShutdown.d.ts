import * as Q from "../../../Queue/index.js";
import type * as C from "./core.js";
/**
 * Create a sink which enqueues each element into the specified queue.
 */
export declare function fromQueueWithShutdown<R, InErr, E, I>(queue: Q.XQueue<R, never, E, unknown, I, void>): C.Sink<R, InErr, I, InErr | E, unknown, void>;
//# sourceMappingURL=fromQueueWithShutdown.d.ts.map