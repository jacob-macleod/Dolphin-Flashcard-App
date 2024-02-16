import "../Operator/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type * as HS from "../Collections/Mutable/HashSet/index.js";
import * as T from "../Effect/index.js";
import * as P from "../Promise/index.js";
import type { AtomicBoolean } from "../Support/AtomicBoolean/index.js";
import * as MQ from "../Support/MutableQueue/index.js";
import type * as InternalHub from "./_internal/Hub.js";
/**
 * A `Strategy<A>` describes the protocol for how publishers and subscribers
 * will communicate with each other through the hub.
 */
export declare abstract class Strategy<A> {
    /**
     * Describes how publishers should signal to subscribers that they are
     * waiting for space to become available in the hub.
     */
    abstract handleSurplus(hub: InternalHub.Hub<A>, subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>, as: Iterable<A>, isShutdown: AtomicBoolean): T.UIO<boolean>;
    /**
     * Describes any finalization logic associated with this strategy.
     */
    abstract shutdown: T.UIO<void>;
    /**
     * Describes how subscribers should signal to publishers waiting for space
     * to become available in the hub that space may be available.
     */
    abstract unsafeOnHubEmptySpace(hub: InternalHub.Hub<A>, subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>): void;
    /**
     * Describes how subscribers waiting for additional values from the hub
     * should take those values and signal to publishers that they are no
     * longer waiting for additional values.
     */
    unsafeCompletePollers(hub: InternalHub.Hub<A>, subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>, subscription: InternalHub.Subscription<A>, pollers: MQ.MutableQueue<P.Promise<never, A>>): void;
    /**
     * Describes how publishers should signal to subscribers waiting for
     * additional values from the hub that new values are available.
     */
    unsafeCompleteSubscribers(hub: InternalHub.Hub<A>, subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>): void;
}
/**
 * A strategy that applies back pressure to publishers when the hub is at
 * capacity. This guarantees that all subscribers will receive all messages
 * published to the hub while they are subscribed. However, it creates the
 * risk that a slow subscriber will slow down the rate at which messages
 * are published and received by other subscribers.
 */
export declare class BackPressure<A> extends Strategy<A> {
    publishers: MQ.MutableQueue<readonly [A, P.Promise<never, boolean>, boolean]>;
    handleSurplus(hub: InternalHub.Hub<A>, subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>, as: Iterable<A>, isShutdown: AtomicBoolean): T.UIO<boolean>;
    get shutdown(): T.UIO<void>;
    unsafeOnHubEmptySpace(hub: InternalHub.Hub<A>, subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>): void;
    private unsafeOffer;
    private unsafeRemove;
}
/**
 * A strategy that drops new messages when the hub is at capacity. This
 * guarantees that a slow subscriber will not slow down the rate at which
 * messages are published. However, it creates the risk that a slow
 * subscriber will slow down the rate at which messages are received by
 * other subscribers and that subscribers may not receive all messages
 * published to the hub while they are subscribed.
 */
export declare class Dropping<A> extends Strategy<A> {
    handleSurplus(_hub: InternalHub.Hub<A>, _subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>, _as: Iterable<A>, _isShutdown: AtomicBoolean): T.UIO<boolean>;
    shutdown: T.UIO<void>;
    unsafeOnHubEmptySpace(_hub: InternalHub.Hub<A>, _subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>): void;
}
/**
 * A strategy that adds new messages and drops old messages when the hub is
 * at capacity. This guarantees that a slow subscriber will not slow down
 * the rate at which messages are published and received by other
 * subscribers. However, it creates the risk that a slow subscriber will
 * not receive some messages published to the hub while it is subscribed.
 */
export declare class Sliding<A> extends Strategy<A> {
    private unsafeSlidingPublish;
    handleSurplus(hub: InternalHub.Hub<A>, subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>, as: Iterable<A>, _isShutdown: AtomicBoolean): T.UIO<boolean>;
    shutdown: T.UIO<void>;
    unsafeOnHubEmptySpace(_hub: InternalHub.Hub<A>, _subscribers: HS.HashSet<Tp.Tuple<[InternalHub.Subscription<A>, MQ.MutableQueue<P.Promise<never, A>>]>>): void;
}
//# sourceMappingURL=Strategy.d.ts.map