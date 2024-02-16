import type * as CL from "../Clock/index.js";
import * as HS from "../Collections/Immutable/HashSet/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import * as T from "../Effect/index.js";
import * as Ex from "../Exit/index.js";
import * as M from "../Managed/index.js";
import * as Q from "../Queue/index.js";
import * as Ref from "../Ref/index.js";
import * as AT from "./Attempted.js";
import * as STR from "./Strategy.js";
declare abstract class Pool<Error, Item> {
    readonly [T._E]: () => Error;
    readonly [T._A]: () => Item;
}
declare abstract class PoolInternal<Error, Item> extends Pool<Error, Item> {
    readonly [T._E]: () => Error;
    readonly [T._A]: () => Item;
    abstract get(): M.IO<Error, Item>;
    abstract invalidate(item: Item): T.UIO<void>;
}
export declare function get<Error, Item>(self: Pool<Error, Item>): M.IO<Error, Item>;
export declare function invalidate_<Error, Item>(self: Pool<Error, Item>, item: Item): T.UIO<void>;
export declare function invalidate<Item>(item: Item): <Error_1>(self: Pool<Error_1, Item>) => T.UIO<void>;
export declare type Range = Tp.Tuple<[begin: number, end: number]>;
interface State {
    readonly size: number;
    readonly free: number;
}
export declare class DefaultPool<R, E, A, S> extends PoolInternal<E, A> {
    readonly creator: M.IO<E, A>;
    readonly range: Range;
    readonly isShuttingDown: Ref.Ref<boolean>;
    readonly state: Ref.Ref<State>;
    readonly items: Q.Queue<AT.Attempted<E, A>>;
    readonly invalidated: Ref.Ref<HS.HashSet<A>>;
    readonly track: (exit: Ex.Exit<E, A>) => T.UIO<void>;
    constructor(creator: M.IO<E, A>, range: Range, isShuttingDown: Ref.Ref<boolean>, state: Ref.Ref<State>, items: Q.Queue<AT.Attempted<E, A>>, invalidated: Ref.Ref<HS.HashSet<A>>, track: (exit: Ex.Exit<E, A>) => T.UIO<void>);
    /**
     * Returns the number of items in the pool in excess of the minimum size.
     */
    excess(): T.UIO<number>;
    get(): M.IO<E, A>;
    /**
     * Begins pre-allocating pool entries based on minimum pool size.
     */
    initialize(): T.UIO<void>;
    invalidate(item: A): T.UIO<void>;
    /**
     * Shrinks the pool down, but never to less than the minimum size.
     */
    shrink(): T.UIO<unknown>;
    allocate(): T.UIO<unknown>;
    /**
     * Gets items from the pool and shuts them down as long as there are items
     * free, signalling shutdown of the pool if the pool is empty.
     */
    getAndShutdown(): T.UIO<void>;
    shutdown(): T.UIO<void>;
}
/**
 * Creates a pool from a fixed number of pre-allocated items. This method
 * should only be used when there is no cleanup or release operation
 * associated with items in the pool. If cleanup or release is required,
 * then the `make` constructor should be used instead.
 */
export declare function fromIterable<A>(iterable0: Iterable<A>): M.UIO<Pool<never, NonNullable<A>>>;
/**
 * Makes a new pool of the specified fixed size. The pool is returned in a
 * `Managed`, which governs the lifetime of the pool. When the pool is
 * shutdown because the `Managed` is used, the individual items allocated by
 * the pool will be released in some unspecified order.
 */
export declare function makeFixed<R, E, A>(get: M.Managed<R, E, A>, min: number): M.RIO<R, Pool<E, A>>;
/**
 * Makes a new pool with the specified minimum and maximum sizes and time to
 * live before a pool whose excess items are not being used will be shrunk
 * down to the minimum size. The pool is returned in a `Managed`, which
 * governs the lifetime of the pool. When the pool is shutdown because the
 * `Managed` is used, the individual items allocated by the pool will be
 * released in some unspecified order.
 */
export declare function make<R, E, A>(get: M.IO<E, A>, range: Range, timeToLive: number): M.RIO<R & CL.HasClock, Pool<E, A>>;
/**
 * A more powerful variant of `make` that allows specifying a `Strategy` that
 * describes how a pool whose excess items are not being used will be shrunk
 * down to the minimum size.
 */
export declare function makeWith<R, R1, E, A>(get: M.Managed<R, E, A>, range: Range, strategy: STR.Strategy<R1, E, A>): M.RIO<R & R1, Pool<E, A>>;
export {};
//# sourceMappingURL=Pool.d.ts.map