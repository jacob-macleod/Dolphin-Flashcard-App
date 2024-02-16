import type { MutableQueue } from "../Support/MutableQueue/index.js";
import type { Strategy } from "./core.js";
import type { Queue } from "./xqueue.js";
/**
 * Unsafely creates a queue
 *
 * @ets_data_first unsafeCreateQueue_
 */
export declare function unsafeCreateQueue<A>(strategy: Strategy<A>): (queue: MutableQueue<A>) => Queue<A>;
/**
 * Unsafely creates a queue
 */
export declare function unsafeCreateQueue_<A>(queue: MutableQueue<A>, strategy: Strategy<A>): Queue<A>;
/**
 * Unsafely creates a sliding queue
 */
export declare function unsafeMakeSliding<A>(capacity: number): Queue<A>;
/**
 * Unsafely creates a unbounded queue
 */
export declare function unsafeMakeUnbounded<A>(): Queue<A>;
/**
 * Unsafely creates a dropping queue
 */
export declare function unsafeMakeDropping<A>(capacity: number): Queue<A>;
/**
 * Unsafely creates a bounded queue
 */
export declare function unsafeMakeBounded<A>(capacity: number): Queue<A>;
//# sourceMappingURL=unsafe.d.ts.map