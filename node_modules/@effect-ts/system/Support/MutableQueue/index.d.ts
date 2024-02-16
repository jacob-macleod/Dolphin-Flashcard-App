import "../../Operator/index.js";
import * as Chunk from "../../Collections/Immutable/Chunk/core.js";
export declare const EmptyQueue: unique symbol;
export declare type EmptyQueue = typeof EmptyQueue;
export interface MutableQueue<A> {
    /**
     * The '''maximum''' number of elements that a queue can hold.
     *
     * @note that unbounded queues can still implement this interface
     * with `capacity = MAX_NUMBER`.
     */
    readonly capacity: number;
    /**
     * A non-blocking enqueue.
     *
     * @return whether the enqueue was successful or not.
     */
    readonly offer: (a: A) => boolean;
    /**
     * A non-blocking enqueue.
     *
     * @return elements that were not enqueued
     */
    readonly offerAll: (a: Iterable<A>) => Chunk.Chunk<A>;
    /**
     * A non-blocking dequeue.
     *
     * @return either an element from the queue, or the `default`
     * param.
     *
     * @note that if there's no meaningful default for your type, you
     * can always use `poll(undefined)`. Not the best, but reasonable price
     * to pay for lower heap churn.
     */
    readonly poll: <D>(a: D) => A | D;
    /**
     * A non-blocking dequeue.
     *
     * @return an array of up to `n` elements
     */
    readonly pollUpTo: (n: number) => Chunk.Chunk<A>;
    /**
     * @return the '''current''' number of elements inside the queue.
     *
     * @note that this method can be non-atomic and return the
     * approximate number in a concurrent setting.
     */
    readonly size: number;
    /**
     * @return if the queue is empty
     */
    readonly isEmpty: boolean;
    /**
     * @return if the queue is full
     */
    readonly isFull: boolean;
}
export declare class Unbounded<A> implements MutableQueue<A> {
    private queue;
    get size(): number;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get capacity(): number;
    offer(a: A): boolean;
    offerAll(as: Iterable<A>): Chunk.Chunk<A>;
    poll<D>(a: D): NonNullable<A> | D;
    pollUpTo(n: number): Chunk.Chunk<A>;
}
export declare class Bounded<A> implements MutableQueue<A> {
    private queue;
    private n;
    constructor(n: number);
    get size(): number;
    get isEmpty(): boolean;
    get isFull(): boolean;
    get capacity(): number;
    offer(a: A): boolean;
    offerAll(as: Iterable<A>): Chunk.Chunk<A>;
    poll<D>(a: D): NonNullable<A> | D;
    pollUpTo(n: number): Chunk.Chunk<A>;
}
//# sourceMappingURL=index.d.ts.map