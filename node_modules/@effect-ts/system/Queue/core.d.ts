import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import type { AtomicBoolean } from "../Support/AtomicBoolean/index.js";
import type { MutableQueue } from "../Support/MutableQueue/index.js";
import * as T from "./effect.js";
import * as P from "./promise.js";
import type { XQueue } from "./xqueue.js";
export { Dequeue, Queue, XQueue } from "./xqueue.js";
export interface Strategy<A> {
    readonly handleSurplus: (as: Chunk.Chunk<A>, queue: MutableQueue<A>, takers: MutableQueue<P.Promise<never, A>>, isShutdown: AtomicBoolean) => T.UIO<boolean>;
    readonly unsafeOnQueueEmptySpace: (queue: MutableQueue<A>, takers: MutableQueue<P.Promise<never, A>>) => void;
    readonly surplusSize: number;
    readonly shutdown: T.UIO<void>;
}
export declare class DroppingStrategy<A> implements Strategy<A> {
    handleSurplus(_as: Chunk.Chunk<A>, _queue: MutableQueue<A>, _takers: MutableQueue<P.Promise<never, A>>, _isShutdown: AtomicBoolean): T.UIO<boolean>;
    unsafeOnQueueEmptySpace(_queue: MutableQueue<A>): void;
    get shutdown(): T.UIO<void>;
    get surplusSize(): number;
}
export declare class SlidingStrategy<A> implements Strategy<A> {
    handleSurplus(as: Chunk.Chunk<A>, queue: MutableQueue<A>, takers: MutableQueue<P.Promise<never, A>>, _isShutdown: AtomicBoolean): T.UIO<boolean>;
    unsafeOnQueueEmptySpace(_queue: MutableQueue<A>): void;
    get shutdown(): T.UIO<void>;
    get surplusSize(): number;
    private unsafeSlidingOffer;
}
export declare function unsafeCompletePromise<A>(p: P.Promise<never, A>, a: A): void;
export declare function unsafeCompleteTakers<A>(strategy: Strategy<A>, queue: MutableQueue<A>, takers: MutableQueue<P.Promise<never, A>>): void;
export declare function unsafeRemove<A>(q: MutableQueue<A>, a: A): void;
export declare function unsafePollN<A>(q: MutableQueue<A>, max: number): Chunk.Chunk<A>;
export declare function unsafeOfferAll<A>(q: MutableQueue<A>, as: Chunk.Chunk<A>): Chunk.Chunk<A>;
export declare function unsafePollAll<A>(q: MutableQueue<A>): Chunk.Chunk<A>;
/**
 * Waits until the queue is shutdown.
 * The `IO` returned by this method will not resume until the queue has been shutdown.
 * If the queue is already shutdown, the `IO` will resume right away.
 */
export declare function awaitShutdown<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): T.UIO<void>;
/**
 * How many elements can hold in the queue
 */
export declare function capacity<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): number;
/**
 * `true` if `shutdown` has been called.
 */
export declare function isShutdown<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): T.UIO<boolean>;
/**
 * Places one value in the queue.
 *
 * @ets_data_first offer_
 */
export declare function offer<A>(a: A): <RA, RB, EA, EB, B>(self: XQueue<RA, RB, EA, EB, A, B>) => T.Effect<RA, EA, boolean>;
/**
 * Places one value in the queue.
 */
export declare function offer_<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>, a: A): T.Effect<RA, EA, boolean>;
/**
 * Places one value in the queue.
 *
 * @ets_data_first offerTo_
 */
export declare function offerTo<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): (a: A) => T.Effect<RA, EA, boolean>;
/**
 * Places one value in the queue.
 *
 * @ets_data_first offerTo_
 */
export declare function offerTo_<RA, RB, EA, EB, A, B>(a: A, self: XQueue<RA, RB, EA, EB, A, B>): T.Effect<RA, EA, boolean>;
/**
 * For Bounded Queue: uses the `BackPressure` Strategy, places the values in the queue and always returns true.
 * If the queue has reached capacity, then
 * the fiber performing the `offerAll` will be suspended until there is room in
 * the queue.
 *
 * For Unbounded Queue:
 * Places all values in the queue and returns true.
 *
 * For Sliding Queue: uses `Sliding` Strategy
 * If there is room in the queue, it places the values otherwise it removes the old elements and
 * enqueues the new ones. Always returns true.
 *
 * For Dropping Queue: uses `Dropping` Strategy,
 * It places the values in the queue but if there is no room it will not enqueue them and return false.
 *
 * @ets_data_first offerAll_
 */
export declare function offerAll<A>(as: Iterable<A>): <RA, RB, EA, EB, B>(self: XQueue<RA, RB, EA, EB, A, B>) => T.Effect<RA, EA, boolean>;
/**
 * For Bounded Queue: uses the `BackPressure` Strategy, places the values in the queue and always returns true.
 * If the queue has reached capacity, then
 * the fiber performing the `offerAll` will be suspended until there is room in
 * the queue.
 *
 * For Unbounded Queue:
 * Places all values in the queue and returns true.
 *
 * For Sliding Queue: uses `Sliding` Strategy
 * If there is room in the queue, it places the values otherwise it removes the old elements and
 * enqueues the new ones. Always returns true.
 *
 * For Dropping Queue: uses `Dropping` Strategy,
 * It places the values in the queue but if there is no room it will not enqueue them and return false.
 */
export declare function offerAll_<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>, as: Iterable<A>): T.Effect<RA, EA, boolean>;
/**
 * Interrupts any fibers that are suspended on `offer` or `take`.
 * Future calls to `offer*` and `take*` will be interrupted immediately.
 */
export declare function shutdown<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): T.UIO<void>;
/**
 * Retrieves the size of the queue, which is equal to the number of elements
 * in the queue. This may be negative if fibers are suspended waiting for
 * elements to be added to the queue.
 */
export declare function size<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): T.UIO<number>;
/**
 * Removes the oldest value in the queue. If the queue is empty, this will
 * return a computation that resumes when an item has been added to the queue.
 */
export declare function take<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): T.Effect<RB, EB, B>;
/**
 * Removes all the values in the queue and returns the list of the values. If the queue
 * is empty returns empty list.
 */
export declare function takeAll<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): T.Effect<RB, EB, Chunk.Chunk<B>>;
/**
 * Takes up to max number of values in the queue.
 *
 * @ets_data_first takeAllUpTo_
 */
export declare function takeAllUpTo(n: number): <RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>) => T.Effect<RB, EB, Chunk.Chunk<B>>;
/**
 * Takes up to max number of values in the queue.
 */
export declare function takeAllUpTo_<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>, n: number): T.Effect<RB, EB, Chunk.Chunk<B>>;
//# sourceMappingURL=core.d.ts.map