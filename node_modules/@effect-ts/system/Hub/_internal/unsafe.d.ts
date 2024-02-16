import "../../Operator/index.js";
import * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import * as P from "../../Promise/index.js";
import type * as MQ from "../../Support/MutableQueue/index.js";
import type * as HB from "./Hub.js";
/**
 * Unsafely completes a promise with the specified value.
 */
export declare function unsafeCompletePromise<A>(promise: P.Promise<never, A>, a: A): void;
/**
 * Unsafely offers the specified values to a queue.
 */
export declare function unsafeOfferAll<A>(queue: MQ.MutableQueue<A>, as: Iterable<A>): Chunk.Chunk<A>;
/**
 * Unsafely polls all values from a queue.
 */
export declare function unsafePollAllQueue<A>(queue: MQ.MutableQueue<A>): Chunk.Chunk<A>;
/**
 * Unsafely polls all values from a subscription.
 */
export declare function unsafePollAllSubscription<A>(subscription: HB.Subscription<A>): Chunk.Chunk<A>;
/**
 * Unsafely polls the specified number of values from a subscription.
 */
export declare function unsafePollN<A>(subscription: HB.Subscription<A>, max: number): Chunk.Chunk<A>;
/**
 * Unsafely publishes the specified values to a hub.
 */
export declare function unsafePublishAll<A>(hub: HB.Hub<A>, as: Iterable<A>): Chunk.Chunk<A>;
/**
 * Unsafely removes the specified item from a queue.
 */
export declare function unsafeRemove<A>(queue: MQ.MutableQueue<A>, a: A): void;
//# sourceMappingURL=unsafe.d.ts.map