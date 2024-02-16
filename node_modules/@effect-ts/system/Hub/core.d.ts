import "../Operator/index.js";
import * as T from "../Effect/index.js";
import * as M from "../Managed/index.js";
import * as Q from "../Queue/index.js";
import * as PR from "./primitives.js";
export declare type HubDequeue<R, E, A> = Q.XQueue<never, R, unknown, E, never, A>;
export declare type HubEnqueue<R, E, A> = Q.XQueue<R, never, E, unknown, A, never>;
export declare type Hub<A> = XHub<unknown, unknown, never, never, A, A>;
export declare const HubTypeId: unique symbol;
/**
 * A `Hub<RA, RB, EA, EB, A, B>` is an asynchronous message hub. Publishers
 * can publish messages of type `A` to the hub and subscribers can subscribe to
 * take messages of type `B` from the hub. Publishing messages can require an
 * environment of type `RA` and fail with an error of type `EA`. Taking
 * messages can require an environment of type `RB` and fail with an error of
 * type `EB`.
 */
export interface XHub<RA, RB, EA, EB, A, B> {
    readonly typeId: typeof HubTypeId;
    readonly [PR._RA]: (_: RA) => void;
    readonly [PR._RB]: (_: RB) => void;
    readonly [PR._EA]: () => EA;
    readonly [PR._EB]: () => EB;
    readonly [PR._A]: (_: A) => void;
    readonly [PR._B]: () => B;
}
export declare abstract class XHubInternal<RA, RB, EA, EB, A, B> implements XHub<RA, RB, EA, EB, A, B> {
    readonly typeId: typeof HubTypeId;
    readonly [PR._RA]: (_: RA) => void;
    readonly [PR._RB]: (_: RB) => void;
    readonly [PR._EA]: () => EA;
    readonly [PR._EB]: () => EB;
    readonly [PR._A]: (_: A) => void;
    readonly [PR._B]: () => B;
    /**
     * Waits for the hub to be shut down.
     */
    abstract awaitShutdown: T.UIO<void>;
    /**
     * The maximum capacity of the hub.
     */
    abstract capacity: number;
    /**
     * Checks whether the hub is shut down.
     */
    abstract isShutdown: T.UIO<boolean>;
    /**
     * Publishes a message to the hub, returning whether the message was
     * published to the hub.
     */
    abstract publish(a: A): T.Effect<RA, EA, boolean>;
    /**
     * Publishes all of the specified messages to the hub, returning whether
     * they were published to the hub.
     */
    abstract publishAll(as: Iterable<A>): T.Effect<RA, EA, boolean>;
    /**
     * Shuts down the hub.
     */
    abstract shutdown: T.UIO<void>;
    /**
     * The current number of messages in the hub.
     */
    abstract size: T.UIO<number>;
    /**
     * Subscribes to receive messages from the hub. The resulting subscription
     * can be evaluated multiple times within the scope of the managed to take a
     * message from the hub each time.
     */
    abstract subscribe: M.Managed<unknown, never, HubDequeue<RB, EB, B>>;
}
/**
 * @ets_optimize remove
 */
export declare function concrete<RA, RB, EA, EB, A, B>(_: XHub<RA, RB, EA, EB, A, B>): asserts _ is XHubInternal<RA, RB, EA, EB, A, B>;
/**
 * Waits for the hub to be shut down.
 */
export declare function awaitShutdown<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>): T.UIO<void>;
/**
 * The maximum capacity of the hub.
 */
export declare function capacity<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>): number;
/**
 * Checks whether the hub is shut down.
 */
export declare function isShutdown<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>): T.UIO<boolean>;
/**
 * Publishes a message to the hub, returning whether the message was
 * published to the hub.
 */
export declare function publish_<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>, a: A): T.Effect<RA, EA, boolean>;
/**
 * Publishes a message to the hub, returning whether the message was
 * published to the hub.
 *
 * @ets_data_first publish_
 */
export declare function publish<A>(a: A): <RA, RB, EA, EB, B>(self: XHub<RA, RB, EA, EB, A, B>) => T.Effect<RA, EA, boolean>;
/**
 * Publishes all of the specified messages to the hub, returning whether
 * they were published to the hub.
 */
export declare function publishAll_<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>, as: Iterable<A>): T.Effect<RA, EA, boolean>;
/**
 * Publishes all of the specified messages to the hub, returning whether
 * they were published to the hub.
 *
 * @ets_data_first publishAll_
 */
export declare function publishAll<A>(as: Iterable<A>): <RA, RB, EA, EB, B>(self: XHub<RA, RB, EA, EB, A, B>) => T.Effect<RA, EA, boolean>;
/**
 * Shuts down the hub.
 */
export declare function shutdown<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>): T.UIO<void>;
/**
 * The current number of messages in the hub.
 */
export declare function size<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>): T.UIO<number>;
/**
 * Subscribes to receive messages from the hub. The resulting subscription
 * can be evaluated multiple times within the scope of the managed to take a
 * message from the hub each time.
 */
export declare function subscribe<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>): M.Managed<unknown, never, HubDequeue<RB, EB, B>>;
/**
 * Transforms messages published to the hub using the specified effectual
 * function.
 */
export declare function contramapM_<RA, RB, RC, EA, EB, EC, A, B, C>(self: XHub<RA, RB, EA, EB, A, B>, f: (c: C) => T.Effect<RC, EC, A>): XHub<RC & RA, RB, EA | EC, EB, C, B>;
/**
 * Transforms messages published to the hub using the specified effectual
 * function.
 *
 * @ets_data_first contramapM_
 */
export declare function contramapM<RC, EC, A, C>(f: (c: C) => T.Effect<RC, EC, A>): <RA, RB, EA, EB, B>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RC & RA, RB, EC | EA, EB, C, B>;
/**
 * Transforms messages published to and taken from the hub using the
 * specified functions.
 */
export declare function dimap_<RA, RB, EA, EB, A, B, C, D>(self: XHub<RA, RB, EA, EB, A, B>, f: (c: C) => A, g: (b: B) => D): XHub<RA, RB, EA, EB, C, D>;
/**
 * Transforms messages published to and taken from the hub using the
 * specified functions.
 *
 * @ets_data_first dimap_
 */
export declare function dimap<A, B, C, D>(f: (c: C) => A, g: (b: B) => D): <RA, RB, EA, EB>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RA, RB, EA, EB, C, D>;
/**
 * Transforms messages published to and taken from the hub using the
 * specified effectual functions.
 */
export declare function dimapM_<RA, RB, RC, RD, EA, EB, EC, ED, A, B, C, D>(self: XHub<RA, RB, EA, EB, A, B>, f: (c: C) => T.Effect<RC, EC, A>, g: (b: B) => T.Effect<RD, ED, D>): XHub<RC & RA, RD & RB, EA | EC, EB | ED, C, D>;
/**
 * Transforms messages published to and taken from the hub using the
 * specified effectual functions.
 *
 * @ets_data_first dimapM_
 */
export declare function dimapM<A, B, C, D, EC, ED, RC, RD>(f: (c: C) => T.Effect<RC, EC, A>, g: (b: B) => T.Effect<RD, ED, D>): <RA, RB, EA, EB>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RC & RA, RD & RB, EC | EA, ED | EB, C, D>;
/**
 * Filters messages published to the hub using the specified function.
 */
export declare function filterInput_<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>, f: (a: A) => boolean): XHub<RA, RB, EA, EB, A, B>;
/**
 * Filters messages published to the hub using the specified function.
 *
 * @ets_data_first filterInput_
 */
export declare function filterInput<A>(f: (a: A) => boolean): <RA, RB, EA, EB, B>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RA, RB, EA, EB, A, B>;
/**
 * Filters messages published to the hub using the specified effectual
 * function.
 */
export declare function filterInputM_<RA, RA1, RB, EA, EA1, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>, f: (a: A) => T.Effect<RA1, EA1, boolean>): XHub<RA & RA1, RB, EA | EA1, EB, A, B>;
/**
 * Filters messages published to the hub using the specified effectual
 * function.
 *
 * @ets_data_first filterInputM_
 */
export declare function filterInputM<RA1, EA1, A>(f: (a: A) => T.Effect<RA1, EA1, boolean>): <RA, RB, EA, EB, B>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RA & RA1, RB, EA1 | EA, EB, A, B>;
/**
 * Filters messages taken from the hub using the specified function.
 */
export declare function filterOutput_<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>, f: (b: B) => boolean): XHub<RA, RB, EA, EB, A, B>;
/**
 * Filters messages taken from the hub using the specified function.
 *
 * @ets_data_first filterOutput_
 */
export declare function filterOutput<B>(f: (b: B) => boolean): <RA, RB, EA, EB, A>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RA, RB, EA, EB, A, B>;
/**
 * Filters messages taken from the hub using the specified effectual
 * function.
 */
export declare function filterOutputM_<RA, RB, RB1, EA, EB, EB1, A, B>(self: XHub<RA, RB, EA, EB, A, B>, f: (a: B) => T.Effect<RB1, EB1, boolean>): XHub<RA, RB & RB1, EA, EB | EB1, A, B>;
/**
 * Filters messages taken from the hub using the specified effectual
 * function.
 *
 * @ets_data_first filterOutputM_
 */
export declare function filterOutputM<RB1, EB1, B>(f: (a: B) => T.Effect<RB1, EB1, boolean>): <RA, RB, EA, EB, A>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RA, RB & RB1, EA, EB1 | EB, A, B>;
/**
 * Transforms messages taken from the hub using the specified function.
 */
export declare function map_<RA, RB, EA, EB, A, B, C>(self: XHub<RA, RB, EA, EB, A, B>, f: (b: B) => C): XHub<RA, RB, EA, EB, A, C>;
/**
 * Transforms messages taken from the hub using the specified function.
 *
 * @ets_data_first map_
 */
export declare function map<B, C>(f: (b: B) => C): <RA, RB, EA, EB, A>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RA, RB, EA, EB, A, C>;
/**
 * Transforms messages taken from the hub using the specified effectual
 * function.
 */
export declare function mapM_<RA, RB, RC, EA, EB, EC, A, B, C>(self: XHub<RA, RB, EA, EB, A, B>, f: (b: B) => T.Effect<RC, EC, C>): XHub<RA, RC & RB, EA, EB | EC, A, C>;
/**
 * Transforms messages taken from the hub using the specified effectual
 * function.
 *
 * @ets_data_first mapM_
 */
export declare function mapM<B, C, EC, RC>(f: (b: B) => T.Effect<RC, EC, C>): <A, EA, EB, RA, RB>(self: XHub<RA, RB, EA, EB, A, B>) => XHub<RA, RC & RB, EA, EC | EB, A, C>;
/**
 * Views the hub as a queue that can only be written to.
 */
export declare function toQueue<RA, RB, EA, EB, A, B>(self: XHub<RA, RB, EA, EB, A, B>): HubEnqueue<RA, EA, A>;
/**
 * Creates a bounded hub with the back pressure strategy. The hub will retain
 * messages until they have been taken by all subscribers, applying back
 * pressure to publishers if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */
export declare function makeBounded<A>(requestedCapacity: number): T.UIO<Hub<A>>;
/**
 * Creates a bounded hub with the back pressure strategy. The hub will retain
 * messages until they have been taken by all subscribers, applying back
 * pressure to publishers if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */
export declare function unsafeMakeBounded<A>(requestedCapacity: number): Hub<A>;
/**
 * Creates a bounded hub with the dropping strategy. The hub will drop new
 * messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */
export declare function makeDropping<A>(requestedCapacity: number): T.UIO<Hub<A>>;
/**
 * Creates a bounded hub with the dropping strategy. The hub will drop new
 * messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */
export declare function unsafeMakeDropping<A>(requestedCapacity: number): Hub<A>;
/**
 * Creates a bounded hub with the sliding strategy. The hub will add new
 * messages and drop old messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */
export declare function makeSliding<A>(requestedCapacity: number): T.UIO<Hub<A>>;
/**
 * Creates a bounded hub with the sliding strategy. The hub will add new
 * messages and drop old messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */
export declare function unsafeMakeSliding<A>(requestedCapacity: number): Hub<A>;
/**
 * Creates an unbounded hub.
 */
export declare function makeUnbounded<A>(): T.UIO<Hub<A>>;
/**
 * Creates an unbounded hub.
 */
export declare function unsafeMakeUnbounded<A>(): Hub<A>;
//# sourceMappingURL=core.d.ts.map