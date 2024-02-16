import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import { BackPressureStrategy, createQueue, makeBoundedQueue as makeBounded, unsafeCreateQueue as unsafeCreate } from "../Effect/excl-forEach.js";
import * as T from "./effect-api.js";
import type { Queue, XQueue } from "./xqueue.js";
export { createQueue, makeBounded, unsafeCreate, BackPressureStrategy };
/**
 * Creates a sliding queue
 */
export declare function makeSliding<A>(capacity: number): T.UIO<Queue<A>>;
/**
 * Creates a unbouded queue
 */
export declare function makeUnbounded<A>(): T.UIO<Queue<A>>;
/**
 * Creates a dropping queue
 */
export declare function makeDropping<A>(capacity: number): T.UIO<Queue<A>>;
/**
 * Takes between min and max number of values from the queue. If there
 * is less than min items available, it'll block until the items are
 * collected.
 *
 * @ets_data_first takeBetween_
 */
export declare function takeBetween(min: number, max: number): <RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>) => T.Effect<RB, EB, Chunk.Chunk<B>>;
/**
 * Takes between min and max number of values from the queue. If there
 * is less than min items available, it'll block until the items are
 * collected.
 */
export declare function takeBetween_<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>, min: number, max: number): T.Effect<RB, EB, Chunk.Chunk<B>>;
/**
 * Creates a new queue from this queue and another. Offering to the composite queue
 * will broadcast the elements to both queues; taking from the composite queue
 * will dequeue elements from both queues and apply the function point-wise.
 *
 * Note that using queues with different strategies may result in surprising behavior.
 * For example, a dropping queue and a bounded queue composed together may apply `f`
 * to different elements.
 *
 * @ets_data_first bothWithM_
 */
export declare function bothWithM<RA1, RB1, EA1, EB1, A1 extends A, C, B, R3, E3, D, A>(that: XQueue<RA1, RB1, EA1, EB1, A1, C>, f: (b: B, c: C) => T.Effect<R3, E3, D>): <RA, RB, EA, EB>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA & RA1, RB & RB1 & R3, EA1 | EA, EB1 | E3 | EB, A1, D>;
/**
 * Creates a new queue from this queue and another. Offering to the composite queue
 * will broadcast the elements to both queues; taking from the composite queue
 * will dequeue elements from both queues and apply the function point-wise.
 *
 * Note that using queues with different strategies may result in surprising behavior.
 * For example, a dropping queue and a bounded queue composed together may apply `f`
 * to different elements.
 */
export declare function bothWithM_<RA, RB, EA, EB, RA1, RB1, EA1, EB1, A1 extends A, C, B, R3, E3, D, A>(self: XQueue<RA, RB, EA, EB, A, B>, that: XQueue<RA1, RB1, EA1, EB1, A1, C>, f: (b: B, c: C) => T.Effect<R3, E3, D>): XQueue<RA & RA1, RB & RB1 & R3, EA | EA1, E3 | EB | EB1, A1, D>;
/**
 * Like `bothWithM`, but uses a pure function.
 *
 * @ets_data_first bothWith_
 */
export declare function bothWith<RA1, RB1, EA1, EB1, A1 extends A, C, B, D, A>(that: XQueue<RA1, RB1, EA1, EB1, A1, C>, f: (b: B, c: C) => D): <RA, RB, EA, EB>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA & RA1, RB & RB1, EA1 | EA, EB1 | EB, A1, D>;
/**
 * Like `bothWithM`, but uses a pure function.
 */
export declare function bothWith_<RA, RB, EA, EB, RA1, RB1, EA1, EB1, A1 extends A, C, B, D, A>(self: XQueue<RA, RB, EA, EB, A, B>, that: XQueue<RA1, RB1, EA1, EB1, A1, C>, f: (b: B, c: C) => D): XQueue<RA & RA1, RB & RB1, EA | EA1, EB | EB1, A1, D>;
/**
 * Like `bothWith`, but tuples the elements instead of applying a function.
 *
 * @ets_data_first both_
 */
export declare function both<RA1, RB1, EA1, EB1, A1 extends A, C, B, A>(that: XQueue<RA1, RB1, EA1, EB1, A1, C>): <RA, RB, EA, EB>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA & RA1, RB & RB1, EA1 | EA, EB1 | EB, A1, readonly [B, C]>;
/**
 * Like `bothWith`, but tuples the elements instead of applying a function.
 */
export declare function both_<RA, RB, EA, EB, RA1, RB1, EA1, EB1, A1 extends A, C, B, A>(self: XQueue<RA, RB, EA, EB, A, B>, that: XQueue<RA1, RB1, EA1, EB1, A1, C>): XQueue<RA & RA1, RB & RB1, EA | EA1, EB | EB1, A1, readonly [B, C]>;
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 *
 * @ets_data_first dimap_
 */
export declare function dimap<A, B, C, D>(f: (c: C) => A, g: (b: B) => D): <RA, RB, EA, EB>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA, RB, EA, EB, C, D>;
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 */
export declare function dimap_<RA, RB, EA, EB, A, B, C, D>(self: XQueue<RA, RB, EA, EB, A, B>, f: (c: C) => A, g: (b: B) => D): XQueue<RA, RB, EA, EB, C, D>;
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 *
 * @ets_data_first dimapM_
 */
export declare function dimapM<A, B, C, RC, EC, RD, ED, D>(f: (c: C) => T.Effect<RC, EC, A>, g: (b: B) => T.Effect<RD, ED, D>): <RA, RB, EA, EB>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RC & RA, RD & RB, EC | EA, ED | EB, C, D>;
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 */
export declare function dimapM_<RA, RB, EA, EB, A, B, C, RC, EC, RD, ED, D>(self: XQueue<RA, RB, EA, EB, A, B>, f: (c: C) => T.Effect<RC, EC, A>, g: (b: B) => T.Effect<RD, ED, D>): XQueue<RC & RA, RD & RB, EC | EA, ED | EB, C, D>;
/**
 * Transforms elements enqueued into this queue with an effectful function.
 */
export declare function contramapM_<RA, RB, EA, EB, B, C, RA2, EA2, A>(self: XQueue<RA, RB, EA, EB, A, B>, f: (c: C) => T.Effect<RA2, EA2, A>): XQueue<RA2 & RA, RB, EA | EA2, EB, C, B>;
/**
 * Transforms elements enqueued into this queue with an effectful function.
 *
 * @ets_data_first contramapM_
 */
export declare function contramapM<C, RA2, EA2, A>(f: (c: C) => T.Effect<RA2, EA2, A>): <RA, RB, EA, EB, B>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA2 & RA, RB, EA2 | EA, EB, C, B>;
/**
 * Transforms elements enqueued into this queue with a pure function.
 */
export declare function contramap_<RA, RB, EA, EB, B, C, A>(self: XQueue<RA, RB, EA, EB, A, B>, f: (c: C) => A): XQueue<RA, RB, EA, EB, C, B>;
/**
 * Transforms elements enqueued into this queue with a pure function.
 *
 * @ets_data_first contramap_
 */
export declare function contramap<C, A>(f: (c: C) => A): <RA, RB, EA, EB, B>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA, RB, EA, EB, C, B>;
/**
 * Like `filterInput`, but uses an effectful function to filter the elements.
 *
 * @ets_data_first filterInputM_
 */
export declare function filterInputM<A, A1 extends A, R2, E2>(f: (_: A1) => T.Effect<R2, E2, boolean>): <RA, RB, EA, EB, B>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA & R2, RB, E2 | EA, EB, A1, B>;
/**
 * Like `filterInput`, but uses an effectful function to filter the elements.
 */
export declare function filterInputM_<RA, RB, EA, EB, B, A, A1 extends A, R2, E2>(self: XQueue<RA, RB, EA, EB, A, B>, f: (_: A1) => T.Effect<R2, E2, boolean>): XQueue<RA & R2, RB, EA | E2, EB, A1, B>;
/**
 * Filters elements dequeued from the queue using the specified effectual
 * predicate.
 */
export declare function filterOutputM_<RA, RB, RB1, EB1, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>, f: (b: B) => T.Effect<RB1, EB1, boolean>): XQueue<RA, RB & RB1, EA, EB | EB1, A, B>;
/**
 * Filters elements dequeued from the queue using the specified effectual
 * predicate.
 *
 * @ets_data_first filterOutputM_
 */
export declare function filterOutputM<RB1, EB1, B>(f: (b: B) => T.Effect<RB1, EB1, boolean>): <RA, RB, EA, EB, A>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA, RB & RB1, EA, EB1 | EB, A, B>;
/**
 * Filters elements dequeued from the queue using the specified predicate.
 */
export declare function filterOutput_<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>, f: (b: B) => boolean): XQueue<RA, RB, EA, EB, A, B>;
/**
 * Filters elements dequeued from the queue using the specified predicate.
 *
 * @ets_data_first filterOutput_
 */
export declare function filterOutput<B>(f: (b: B) => boolean): <RA, RB, EA, EB, A>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA, RB, EA, EB, A, B>;
/**
 * Applies a filter to elements enqueued into this queue. Elements that do not
 * pass the filter will be immediately dropped.
 *
 * @ets_data_first filterInput_
 */
export declare function filterInput<A, A1 extends A>(f: (_: A1) => boolean): <RA, RB, EA, EB, B>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA, RB, EA, EB, A1, B>;
/**
 * Applies a filter to elements enqueued into this queue. Elements that do not
 * pass the filter will be immediately dropped.
 */
export declare function filterInput_<RA, RB, EA, EB, B, A, A1 extends A>(self: XQueue<RA, RB, EA, EB, A, B>, f: (_: A1) => boolean): XQueue<RA, RB, EA, EB, A1, B>;
/**
 * Transforms elements dequeued from this queue with a function.
 */
export declare function map_<RA, RB, EA, EB, A, B, C>(self: XQueue<RA, RB, EA, EB, A, B>, f: (b: B) => C): XQueue<RA, RB, EA, EB, A, C>;
/**
 * Transforms elements dequeued from this queue with a function.
 *
 * @ets_data_first map_
 */
export declare function map<RA, RB, EA, EB, A, B, C>(f: (b: B) => C): (self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA, RB, EA, EB, A, C>;
/**
 * Transforms elements dequeued from this queue with an effectful function.
 *
 * @ets_data_first mapM_
 */
export declare function mapM<B, R2, E2, C>(f: (b: B) => T.Effect<R2, E2, C>): <RA, RB, EA, EB, A>(self: XQueue<RA, RB, EA, EB, A, B>) => XQueue<RA, R2 & RB, EA, E2 | EB, A, C>;
/**
 * Transforms elements dequeued from this queue with an effectful function.
 */
export declare function mapM_<RA, RB, EA, EB, A, B, R2, E2, C>(self: XQueue<RA, RB, EA, EB, A, B>, f: (b: B) => T.Effect<R2, E2, C>): XQueue<RA, R2 & RB, EA, EB | E2, A, C>;
/**
 * Take the head option of values in the queue.
 */
export declare function poll<RA, RB, EA, EB, A, B>(self: XQueue<RA, RB, EA, EB, A, B>): T.Effect<RB, EB, B>;
//# sourceMappingURL=api.d.ts.map