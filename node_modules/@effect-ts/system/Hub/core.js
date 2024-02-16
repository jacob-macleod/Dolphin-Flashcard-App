"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XHubInternal = exports.HubTypeId = void 0;
exports.awaitShutdown = awaitShutdown;
exports.capacity = capacity;
exports.concrete = concrete;
exports.contramapM = contramapM;
exports.contramapM_ = contramapM_;
exports.dimap = dimap;
exports.dimapM = dimapM;
exports.dimapM_ = dimapM_;
exports.dimap_ = dimap_;
exports.filterInput = filterInput;
exports.filterInputM = filterInputM;
exports.filterInputM_ = filterInputM_;
exports.filterInput_ = filterInput_;
exports.filterOutput = filterOutput;
exports.filterOutputM = filterOutputM;
exports.filterOutputM_ = filterOutputM_;
exports.filterOutput_ = filterOutput_;
exports.isShutdown = isShutdown;
exports.makeBounded = makeBounded;
exports.makeDropping = makeDropping;
exports.makeSliding = makeSliding;
exports.makeUnbounded = makeUnbounded;
exports.map = map;
exports.mapM = mapM;
exports.mapM_ = mapM_;
exports.map_ = map_;
exports.publish = publish;
exports.publishAll = publishAll;
exports.publishAll_ = publishAll_;
exports.publish_ = publish_;
exports.shutdown = shutdown;
exports.size = size;
exports.subscribe = subscribe;
exports.toQueue = toQueue;
exports.unsafeMakeBounded = unsafeMakeBounded;
exports.unsafeMakeDropping = unsafeMakeDropping;
exports.unsafeMakeSliding = unsafeMakeSliding;
exports.unsafeMakeUnbounded = unsafeMakeUnbounded;

require("../Operator/index.js");

var AR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var HS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Mutable/HashSet/index.js"));

var ES = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Effect/ExecutionStrategy.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/index.js"));

var _index9 = /*#__PURE__*/require("../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Managed/index.js"));

var RM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Managed/ReleaseMap/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Queue/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

var AB = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Support/AtomicBoolean/index.js"));

var MQ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Support/MutableQueue/index.js"));

var HF = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/hubFactory.js"));

var U = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/unsafe.js"));

var PR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./primitives.js"));

var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./Strategy.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const HubTypeId = /*#__PURE__*/Symbol();
exports.HubTypeId = HubTypeId;

class XHubInternal {
  constructor() {
    this.typeId = HubTypeId;
  }

}

exports.XHubInternal = XHubInternal;
PR._RA, PR._RB, PR._EA, PR._EB, PR._A, PR._B;
/**
 * @ets_optimize remove
 */

function concrete(_) {//
}
/**
 * Waits for the hub to be shut down.
 */


function awaitShutdown(self) {
  ;
  return self.awaitShutdown;
}
/**
 * The maximum capacity of the hub.
 */


function capacity(self) {
  ;
  return self.capacity;
}
/**
 * Checks whether the hub is shut down.
 */


function isShutdown(self) {
  ;
  return self.isShutdown;
}
/**
 * Publishes a message to the hub, returning whether the message was
 * published to the hub.
 */


function publish_(self, a) {
  ;
  return self.publish(a);
}
/**
 * Publishes a message to the hub, returning whether the message was
 * published to the hub.
 *
 * @ets_data_first publish_
 */


function publish(a) {
  return self => publish_(self, a);
}
/**
 * Publishes all of the specified messages to the hub, returning whether
 * they were published to the hub.
 */


function publishAll_(self, as) {
  ;
  return self.publishAll(as);
}
/**
 * Publishes all of the specified messages to the hub, returning whether
 * they were published to the hub.
 *
 * @ets_data_first publishAll_
 */


function publishAll(as) {
  return self => publishAll_(self, as);
}
/**
 * Shuts down the hub.
 */


function shutdown(self) {
  ;
  return self.shutdown;
}
/**
 * The current number of messages in the hub.
 */


function size(self) {
  ;
  return self.size;
}
/**
 * Subscribes to receive messages from the hub. The resulting subscription
 * can be evaluated multiple times within the scope of the managed to take a
 * message from the hub each time.
 */


function subscribe(self) {
  ;
  return self.subscribe;
}
/**
 * Transforms messages published to the hub using the specified effectual
 * function.
 */


function contramapM_(self, f) {
  return dimapM_(self, f, T.succeed);
}
/**
 * Transforms messages published to the hub using the specified effectual
 * function.
 *
 * @ets_data_first contramapM_
 */


function contramapM(f) {
  return self => contramapM_(self, f);
}
/**
 * Transforms messages published to and taken from the hub using the
 * specified functions.
 */


function dimap_(self, f, g) {
  return dimapM_(self, c => T.succeed(f(c)), b => T.succeed(g(b)));
}
/**
 * Transforms messages published to and taken from the hub using the
 * specified functions.
 *
 * @ets_data_first dimap_
 */


function dimap(f, g) {
  return self => dimap_(self, f, g);
}

class DimapMImplementation extends XHubInternal {
  constructor(source, f, g) {
    super();
    this.source = source;
    this.f = f;
    this.awaitShutdown = source.awaitShutdown;
    this.capacity = source.capacity;
    this.isShutdown = source.isShutdown;
    this.shutdown = source.shutdown;
    this.size = source.size;
    this.subscribe = M.map_(source.subscribe, Q.mapM(g));
  }

  publish(c) {
    return T.chain_(this.f(c), a => this.source.publish(a));
  }

  publishAll(cs) {
    return T.chain_(T.forEach_(cs, this.f), as => this.source.publishAll(as));
  }

}
/**
 * Transforms messages published to and taken from the hub using the
 * specified effectual functions.
 */


function dimapM_(self, f, g) {
  ;
  return new DimapMImplementation(self, f, g);
}
/**
 * Transforms messages published to and taken from the hub using the
 * specified effectual functions.
 *
 * @ets_data_first dimapM_
 */


function dimapM(f, g) {
  return self => dimapM_(self, f, g);
}

class filterInputMImplementation extends XHubInternal {
  constructor(source, f) {
    super();
    this.source = source;
    this.f = f;
    this.awaitShutdown = source.awaitShutdown;
    this.capacity = source.capacity;
    this.isShutdown = source.isShutdown;
    this.shutdown = source.shutdown;
    this.size = source.size;
    this.subscribe = source.subscribe;
  }

  publish(a) {
    return T.chain_(this.f(a), b => b ? this.source.publish(a) : T.succeed(false));
  }

  publishAll(as) {
    return T.chain_(T.filter_(as, this.f), as => AR.isNonEmpty(as) ? this.source.publishAll(as) : T.succeed(false));
  }

}
/**
 * Filters messages published to the hub using the specified function.
 */


function filterInput_(self, f) {
  return filterInputM_(self, a => T.succeed(f(a)));
}
/**
 * Filters messages published to the hub using the specified function.
 *
 * @ets_data_first filterInput_
 */


function filterInput(f) {
  return self => filterInput_(self, f);
}
/**
 * Filters messages published to the hub using the specified effectual
 * function.
 */


function filterInputM_(self, f) {
  ;
  return new filterInputMImplementation(self, f);
}
/**
 * Filters messages published to the hub using the specified effectual
 * function.
 *
 * @ets_data_first filterInputM_
 */


function filterInputM(f) {
  return self => filterInputM_(self, f);
}
/**
 * Filters messages taken from the hub using the specified function.
 */


function filterOutput_(self, f) {
  return filterOutputM_(self, b => T.succeed(f(b)));
}
/**
 * Filters messages taken from the hub using the specified function.
 *
 * @ets_data_first filterOutput_
 */


function filterOutput(f) {
  return self => filterOutput_(self, f);
}

class filterOutputMImplementation extends XHubInternal {
  constructor(source, f) {
    super();
    this.source = source;
    this.f = f;
    this.awaitShutdown = source.awaitShutdown;
    this.capacity = source.capacity;
    this.isShutdown = source.isShutdown;
    this.shutdown = source.shutdown;
    this.size = source.size;
    this.subscribe = M.map_(source.subscribe, Q.filterOutputM(f));
  }

  publish(a) {
    return this.source.publish(a);
  }

  publishAll(as) {
    return this.source.publishAll(as);
  }

}
/**
 * Filters messages taken from the hub using the specified effectual
 * function.
 */


function filterOutputM_(self, f) {
  ;
  return new filterOutputMImplementation(self, f);
}
/**
 * Filters messages taken from the hub using the specified effectual
 * function.
 *
 * @ets_data_first filterOutputM_
 */


function filterOutputM(f) {
  return self => filterOutputM_(self, f);
}
/**
 * Transforms messages taken from the hub using the specified function.
 */


function map_(self, f) {
  return mapM_(self, b => T.succeed(f(b)));
}
/**
 * Transforms messages taken from the hub using the specified function.
 *
 * @ets_data_first map_
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Transforms messages taken from the hub using the specified effectual
 * function.
 */


function mapM_(self, f) {
  return dimapM_(self, a => T.succeed(a), f);
}
/**
 * Transforms messages taken from the hub using the specified effectual
 * function.
 *
 * @ets_data_first mapM_
 */


function mapM(f) {
  return self => mapM_(self, f);
}

class ToQueueImplementation extends Q.XQueueInternal {
  constructor(source) {
    super();
    this.source = source;
    this.awaitShutdown = source.awaitShutdown;
    this.capacity = source.capacity;
    this.isShutdown = source.isShutdown;
    this.shutdown = source.shutdown;
    this.size = source.size;
    this.take = T.never;
    this.takeAll = T.succeed(Chunk.empty());
  }

  offer(a) {
    return this.source.publish(a);
  }

  offerAll(as) {
    return this.source.publishAll(as);
  }

  takeUpTo() {
    return T.succeed(Chunk.empty());
  }

}
/**
 * Views the hub as a queue that can only be written to.
 */


function toQueue(self) {
  ;
  return new ToQueueImplementation(self);
}
/**
 * Creates a bounded hub with the back pressure strategy. The hub will retain
 * messages until they have been taken by all subscribers, applying back
 * pressure to publishers if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */


function makeBounded(requestedCapacity) {
  return T.chain_(T.succeedWith(() => HF.makeBounded(requestedCapacity)), _ => makeHub(_, new S.BackPressure()));
}
/**
 * Creates a bounded hub with the back pressure strategy. The hub will retain
 * messages until they have been taken by all subscribers, applying back
 * pressure to publishers if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */


function unsafeMakeBounded(requestedCapacity) {
  const releaseMap = new RM.ReleaseMap(Ref.unsafeMakeRef(new RM.Running(0, new Map())));
  return unsafeMakeHub(HF.makeBounded(requestedCapacity), makeSubscribersHashSet(), releaseMap, P.unsafeMake(F.None), new AB.AtomicBoolean(false), new S.BackPressure());
}
/**
 * Creates a bounded hub with the dropping strategy. The hub will drop new
 * messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */


function makeDropping(requestedCapacity) {
  return T.chain_(T.succeedWith(() => {
    return HF.makeBounded(requestedCapacity);
  }), _ => makeHub(_, new S.Dropping()));
}
/**
 * Creates a bounded hub with the dropping strategy. The hub will drop new
 * messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */


function unsafeMakeDropping(requestedCapacity) {
  const releaseMap = new RM.ReleaseMap(Ref.unsafeMakeRef(new RM.Running(0, new Map())));
  return unsafeMakeHub(HF.makeBounded(requestedCapacity), makeSubscribersHashSet(), releaseMap, P.unsafeMake(F.None), new AB.AtomicBoolean(false), new S.Dropping());
}
/**
 * Creates a bounded hub with the sliding strategy. The hub will add new
 * messages and drop old messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */


function makeSliding(requestedCapacity) {
  return T.chain_(T.succeedWith(() => {
    return HF.makeBounded(requestedCapacity);
  }), _ => makeHub(_, new S.Sliding()));
}
/**
 * Creates a bounded hub with the sliding strategy. The hub will add new
 * messages and drop old messages if the hub is at capacity.
 *
 * For best performance use capacities that are powers of two.
 */


function unsafeMakeSliding(requestedCapacity) {
  const releaseMap = new RM.ReleaseMap(Ref.unsafeMakeRef(new RM.Running(0, new Map())));
  return unsafeMakeHub(HF.makeBounded(requestedCapacity), makeSubscribersHashSet(), releaseMap, P.unsafeMake(F.None), new AB.AtomicBoolean(false), new S.Sliding());
}
/**
 * Creates an unbounded hub.
 */


function makeUnbounded() {
  return T.chain_(T.succeedWith(() => {
    return HF.makeUnbounded();
  }), _ => makeHub(_, new S.Dropping()));
}
/**
 * Creates an unbounded hub.
 */


function unsafeMakeUnbounded() {
  const releaseMap = new RM.ReleaseMap(Ref.unsafeMakeRef(new RM.Running(0, new Map())));
  return unsafeMakeHub(HF.makeUnbounded(), makeSubscribersHashSet(), releaseMap, P.unsafeMake(F.None), new AB.AtomicBoolean(false), new S.Dropping());
}

class UnsafeMakeHubImplementation extends XHubInternal {
  constructor(hub, subscribers, releaseMap, shutdownHook, shutdownFlag, strategy) {
    super();
    this.hub = hub;
    this.subscribers = subscribers;
    this.shutdownFlag = shutdownFlag;
    this.strategy = strategy;
    this.awaitShutdown = P.await(shutdownHook);
    this.capacity = hub.capacity;
    this.isShutdown = T.succeedWith(() => shutdownFlag.get);
    this.shutdown = T.uninterruptible(T.suspend((_, fiberId) => {
      shutdownFlag.set(true);
      return T.asUnit(T.whenM_(T.zipRight_(RM.releaseAll(Ex.interrupt(fiberId), ES.parallel)(releaseMap), strategy.shutdown), P.succeed_(shutdownHook, undefined)));
    }));
    this.size = T.suspend(() => {
      if (shutdownFlag.get) {
        return T.interrupt;
      }

      return T.succeed(hub.size());
    });
    this.subscribe = M.map_(M.tap_(M.bind_(M.do, "dequeue", () => T.toManaged(makeSubscription(hub, subscribers, strategy))), ({
      dequeue
    }) => M.makeExit_(RM.add(_ => Q.shutdown(dequeue))(releaseMap), (finalizer, exit) => finalizer(exit))), ({
      dequeue
    }) => dequeue);
  }

  publish(a) {
    return T.suspend(() => {
      if (this.shutdownFlag.get) {
        return T.interrupt;
      }

      if (this.hub.publish(a)) {
        this.strategy.unsafeCompleteSubscribers(this.hub, this.subscribers);
        return T.succeed(true);
      }

      return this.strategy.handleSurplus(this.hub, this.subscribers, Chunk.single(a), this.shutdownFlag);
    });
  }

  publishAll(as) {
    return T.suspend(() => {
      if (this.shutdownFlag.get) {
        return T.interrupt;
      }

      const surplus = U.unsafePublishAll(this.hub, as);
      this.strategy.unsafeCompleteSubscribers(this.hub, this.subscribers);

      if (Chunk.isEmpty(surplus)) {
        return T.succeed(true);
      }

      return this.strategy.handleSurplus(this.hub, this.subscribers, surplus, this.shutdownFlag);
    });
  }

}

function makeHub(hub, strategy) {
  return T.chain_(RM.makeReleaseMap, releaseMap => {
    return T.map_(P.make(), promise => {
      return unsafeMakeHub(hub, makeSubscribersHashSet(), releaseMap, promise, new AB.AtomicBoolean(false), strategy);
    });
  });
}
/**
 * Unsafely creates a hub with the specified strategy.
 */


function unsafeMakeHub(hub, subscribers, releaseMap, shutdownHook, shutdownFlag, strategy) {
  return new UnsafeMakeHubImplementation(hub, subscribers, releaseMap, shutdownHook, shutdownFlag, strategy);
}
/**
 * Creates a subscription with the specified strategy.
 */


function makeSubscription(hub, subscribers, strategy) {
  return T.map_(P.make(), promise => {
    return unsafeMakeSubscription(hub, subscribers, hub.subscribe(), new MQ.Unbounded(), promise, new AB.AtomicBoolean(false), strategy);
  });
}

class UnsafeMakeSubscriptionImplementation extends Q.XQueueInternal {
  constructor(hub, subscribers, subscription, pollers, shutdownHook, shutdownFlag, strategy) {
    super();
    this.hub = hub;
    this.subscribers = subscribers;
    this.subscription = subscription;
    this.pollers = pollers;
    this.shutdownHook = shutdownHook;
    this.shutdownFlag = shutdownFlag;
    this.strategy = strategy;
    this.awaitShutdown = P.await(this.shutdownHook);
    this.capacity = this.hub.capacity;
    this.isShutdown = T.succeedWith(() => this.shutdownFlag.get);
    this.shutdown = T.uninterruptible(T.suspend((_, fiberId) => {
      this.shutdownFlag.set(true);
      return T.asUnit(T.whenM_(T.zipRight_(T.forEachPar_(U.unsafePollAllQueue(this.pollers), _ => {
        return P.interruptAs(fiberId)(_);
      }), T.succeedWith(() => this.subscription.unsubscribe())), P.succeed_(this.shutdownHook, undefined)));
    }));
    this.size = T.suspend(() => {
      if (this.shutdownFlag.get) {
        return T.interrupt;
      }

      return T.succeed(this.subscription.size());
    });
    this.take = T.suspend((_, fiberId) => {
      if (this.shutdownFlag.get) {
        return T.interrupt;
      }

      const message = this.pollers.isEmpty ? this.subscription.poll(MQ.EmptyQueue) : MQ.EmptyQueue;

      if (message === MQ.EmptyQueue) {
        const promise = P.unsafeMake(fiberId);
        return T.onInterrupt_(T.suspend(() => {
          this.pollers.offer(promise);
          this.subscribers.add(Tp.tuple(this.subscription, this.pollers));
          this.strategy.unsafeCompletePollers(this.hub, this.subscribers, this.subscription, this.pollers);

          if (this.shutdownFlag.get) {
            return T.interrupt;
          } else {
            return P.await(promise);
          }
        }), () => T.succeedWith(() => {
          U.unsafeRemove(this.pollers, promise);
        }));
      } else {
        this.strategy.unsafeOnHubEmptySpace(this.hub, this.subscribers);
        return T.succeed(message);
      }
    });
    this.takeAll = T.suspend(() => {
      if (this.shutdownFlag.get) {
        return T.interrupt;
      }

      const as = this.pollers.isEmpty ? U.unsafePollAllSubscription(this.subscription) : Chunk.empty();
      this.strategy.unsafeOnHubEmptySpace(this.hub, this.subscribers);
      return T.succeed(as);
    });
  }

  offer(_) {
    return T.succeed(false);
  }

  offerAll(_) {
    return T.succeed(false);
  }

  takeUpTo(n) {
    return T.suspend(() => {
      if (this.shutdownFlag.get) {
        return T.interrupt;
      }

      const as = this.pollers.isEmpty ? U.unsafePollN(this.subscription, n) : Chunk.empty();
      this.strategy.unsafeOnHubEmptySpace(this.hub, this.subscribers);
      return T.succeed(as);
    });
  }

}
/**
 * Unsafely creates a subscription with the specified strategy.
 */


function unsafeMakeSubscription(hub, subscribers, subscription, pollers, shutdownHook, shutdownFlag, strategy) {
  return new UnsafeMakeSubscriptionImplementation(hub, subscribers, subscription, pollers, shutdownHook, shutdownFlag, strategy);
}

function makeSubscribersHashSet() {
  return HS.make();
}
//# sourceMappingURL=core.js.map