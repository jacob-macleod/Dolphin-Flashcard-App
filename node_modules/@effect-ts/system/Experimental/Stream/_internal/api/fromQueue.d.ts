import * as Q from "../../../../Queue/index.js";
import * as C from "../core.js";
/**
 * Creates a stream from a `XQueue` of values
 */
export declare function fromQueue_<R, E, O>(queue: Q.XQueue<never, R, unknown, E, never, O>, maxChunkSize?: number): C.Stream<R, E, O>;
/**
 * Creates a stream from a `XQueue` of values
 */
export declare function fromQueue(maxChunkSize?: number): <R, E, O>(queue: Q.XQueue<never, R, unknown, E, never, O>) => C.Stream<R, E, O>;
//# sourceMappingURL=fromQueue.d.ts.map