"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Strategy = exports.Sliding = exports.Dropping = exports.BackPressure = void 0;

require("../Operator/index.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Effect/index.js"));

var _index5 = /*#__PURE__*/require("../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Promise/index.js"));

var MQ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Support/MutableQueue/index.js"));

var U = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/unsafe.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * A `Strategy<A>` describes the protocol for how publishers and subscribers
 * will communicate with each other through the hub.
 */
class Strategy {
  /**
   * Describes how subscribers waiting for additional values from the hub
   * should take those values and signal to publishers that they are no
   * longer waiting for additional values.
   */
  unsafeCompletePollers(hub, subscribers, subscription, pollers) {
    let keepPolling = true;

    while (keepPolling && !subscription.isEmpty()) {
      const poller = pollers.poll(MQ.EmptyQueue);

      if (poller === MQ.EmptyQueue) {
        const subPollerPair = Tp.tuple(subscription, pollers);
        subscribers.remove(subPollerPair);

        if (!pollers.isEmpty) {
          subscribers.add(subPollerPair);
        }

        keepPolling = false;
      } else {
        const pollResult = subscription.poll(MQ.EmptyQueue);

        if (pollResult === MQ.EmptyQueue) {
          U.unsafeOfferAll(pollers, Chunk.prepend_(U.unsafePollAllQueue(pollers), poller));
        } else {
          U.unsafeCompletePromise(poller, pollResult);
          this.unsafeOnHubEmptySpace(hub, subscribers);
        }
      }
    }
  }
  /**
   * Describes how publishers should signal to subscribers waiting for
   * additional values from the hub that new values are available.
   */


  unsafeCompleteSubscribers(hub, subscribers) {
    for (const {
      tuple: [subscription, pollers]
    } of subscribers) {
      this.unsafeCompletePollers(hub, subscribers, subscription, pollers);
    }
  }

}
/**
 * A strategy that applies back pressure to publishers when the hub is at
 * capacity. This guarantees that all subscribers will receive all messages
 * published to the hub while they are subscribed. However, it creates the
 * risk that a slow subscriber will slow down the rate at which messages
 * are published and received by other subscribers.
 */


exports.Strategy = Strategy;

class BackPressure extends Strategy {
  constructor() {
    super(...arguments);
    this.publishers = new MQ.Unbounded();
  }

  handleSurplus(hub, subscribers, as, isShutdown) {
    return T.suspend((_, fiberId) => {
      const promise = P.unsafeMake(fiberId);
      return T.onInterrupt_(T.suspend(() => {
        this.unsafeOffer(as, promise);
        this.unsafeOnHubEmptySpace(hub, subscribers);
        this.unsafeCompleteSubscribers(hub, subscribers);
        return isShutdown.get ? T.interrupt : P.await(promise);
      }), () => T.succeedWith(() => this.unsafeRemove(promise)));
    });
  }

  get shutdown() {
    return T.asUnit(T.tap_(T.bind_(T.bind_(T.do, "fiberId", () => T.fiberId), "publishers", () => T.succeedWith(() => U.unsafePollAllQueue(this.publishers))), ({
      fiberId,
      publishers
    }) => T.forEachPar_(publishers, ([_, promise, last]) => last ? P.interruptAs(fiberId)(promise) : T.unit)));
  }

  unsafeOnHubEmptySpace(hub, subscribers) {
    let keepPolling = true;

    while (keepPolling && !hub.isFull()) {
      const publisher = this.publishers.poll(MQ.EmptyQueue);

      if (publisher === MQ.EmptyQueue) {
        keepPolling = false;
      } else {
        const published = hub.publish(publisher[0]);

        if (published && publisher[2]) {
          U.unsafeCompletePromise(publisher[1], true);
        } else if (!published) {
          U.unsafeOfferAll(this.publishers, Chunk.prepend_(U.unsafePollAllQueue(this.publishers), publisher));
        }

        this.unsafeCompleteSubscribers(hub, subscribers);
      }
    }
  }

  unsafeOffer(as, promise) {
    const it = as[Symbol.iterator]();
    let curr = it.next();

    if (!curr.done) {
      let next;

      while ((next = it.next()) && !next.done) {
        this.publishers.offer([curr.value, promise, false]);
        curr = next;
      }

      this.publishers.offer([curr.value, promise, true]);
    }
  }

  unsafeRemove(promise) {
    U.unsafeOfferAll(this.publishers, Chunk.filter_(U.unsafePollAllQueue(this.publishers), ([_, a]) => a !== promise));
  }

}
/**
 * A strategy that drops new messages when the hub is at capacity. This
 * guarantees that a slow subscriber will not slow down the rate at which
 * messages are published. However, it creates the risk that a slow
 * subscriber will slow down the rate at which messages are received by
 * other subscribers and that subscribers may not receive all messages
 * published to the hub while they are subscribed.
 */


exports.BackPressure = BackPressure;

class Dropping extends Strategy {
  constructor() {
    super(...arguments);
    this.shutdown = T.unit;
  }

  handleSurplus(_hub, _subscribers, _as, _isShutdown) {
    return T.succeed(false);
  }

  unsafeOnHubEmptySpace(_hub, _subscribers) {//
  }

}
/**
 * A strategy that adds new messages and drops old messages when the hub is
 * at capacity. This guarantees that a slow subscriber will not slow down
 * the rate at which messages are published and received by other
 * subscribers. However, it creates the risk that a slow subscriber will
 * not receive some messages published to the hub while it is subscribed.
 */


exports.Dropping = Dropping;

class Sliding extends Strategy {
  constructor() {
    super(...arguments);
    this.shutdown = T.unit;
  }

  unsafeSlidingPublish(hub, as) {
    const it = as[Symbol.iterator]();
    let next = it.next();

    if (!next.done && hub.capacity > 0) {
      let a = next.value;
      let loop = true;

      while (loop) {
        hub.slide();
        const pub = hub.publish(a);

        if (pub && (next = it.next()) && !next.done) {
          a = next.value;
        } else if (pub) {
          loop = false;
        }
      }
    }
  }

  handleSurplus(hub, subscribers, as, _isShutdown) {
    return T.succeedWith(() => {
      this.unsafeSlidingPublish(hub, as);
      this.unsafeCompleteSubscribers(hub, subscribers);
      return true;
    });
  }

  unsafeOnHubEmptySpace(_hub, _subscribers) {//
  }

}

exports.Sliding = Sliding;
//# sourceMappingURL=Strategy.js.map