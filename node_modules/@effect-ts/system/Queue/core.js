"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlidingStrategy = exports.DroppingStrategy = void 0;
exports.awaitShutdown = awaitShutdown;
exports.capacity = capacity;
exports.isShutdown = isShutdown;
exports.offer = offer;
exports.offerAll = offerAll;
exports.offerAll_ = offerAll_;
exports.offerTo = offerTo;
exports.offerTo_ = offerTo_;
exports.offer_ = offer_;
exports.shutdown = shutdown;
exports.size = size;
exports.take = take;
exports.takeAll = takeAll;
exports.takeAllUpTo = takeAllUpTo;
exports.takeAllUpTo_ = takeAllUpTo_;
exports.unsafeCompletePromise = unsafeCompletePromise;
exports.unsafeCompleteTakers = unsafeCompleteTakers;
exports.unsafeOfferAll = unsafeOfferAll;
exports.unsafePollAll = unsafePollAll;
exports.unsafePollN = unsafePollN;
exports.unsafeRemove = unsafeRemove;

var ChunkFilter = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/filter.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var _index = /*#__PURE__*/require("../Support/MutableQueue/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./effect.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./promise.js"));

var _xqueue = /*#__PURE__*/require("./xqueue.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class DroppingStrategy {
  handleSurplus(_as, _queue, _takers, _isShutdown) {
    return T.succeed(false);
  }

  unsafeOnQueueEmptySpace(_queue) {//
  }

  get shutdown() {
    return T.unit;
  }

  get surplusSize() {
    return 0;
  }

}

exports.DroppingStrategy = DroppingStrategy;

class SlidingStrategy {
  handleSurplus(as, queue, takers, _isShutdown) {
    return T.succeedWith(() => {
      this.unsafeSlidingOffer(queue, as);
      unsafeCompleteTakers(this, queue, takers);
      return true;
    });
  }

  unsafeOnQueueEmptySpace(_queue) {//
  }

  get shutdown() {
    return T.unit;
  }

  get surplusSize() {
    return 0;
  }

  unsafeSlidingOffer(queue, as) {
    let bs = as;

    while (Chunk.size(bs) > 0) {
      if (queue.capacity === 0) {
        return;
      } // poll 1 and retry


      queue.poll(_index.EmptyQueue);

      if (queue.offer(Chunk.unsafeGet_(bs, 0))) {
        bs = Chunk.drop_(bs, 1);
      }
    }
  }

}

exports.SlidingStrategy = SlidingStrategy;

function unsafeCompletePromise(p, a) {
  return P.unsafeDone(T.succeed(a))(p);
}

function unsafeCompleteTakers(strategy, queue, takers) {
  let keepPolling = true;

  while (keepPolling && !queue.isEmpty) {
    const taker = takers.poll(_index.EmptyQueue);

    if (taker !== _index.EmptyQueue) {
      const element = queue.poll(_index.EmptyQueue);

      if (element !== _index.EmptyQueue) {
        unsafeCompletePromise(taker, element);
        strategy.unsafeOnQueueEmptySpace(queue, takers);
      } else {
        unsafeOfferAll(takers, Chunk.prepend_(unsafePollAll(takers), taker));
      }

      keepPolling = true;
    } else {
      keepPolling = false;
    }
  }
}

function unsafeRemove(q, a) {
  unsafeOfferAll(q, ChunkFilter.filter_(unsafePollAll(q), b => a !== b));
}

function unsafePollN(q, max) {
  return q.pollUpTo(max);
}

function unsafeOfferAll(q, as) {
  return q.offerAll(as);
}

function unsafePollAll(q) {
  let as = Chunk.empty();

  while (!q.isEmpty) {
    const elem = q.poll(_index.EmptyQueue);

    if (elem !== _index.EmptyQueue) {
      as = Chunk.append_(as, elem);
    }
  }

  return as;
}
/**
 * Waits until the queue is shutdown.
 * The `IO` returned by this method will not resume until the queue has been shutdown.
 * If the queue is already shutdown, the `IO` will resume right away.
 */


function awaitShutdown(self) {
  ;
  return self.awaitShutdown;
}
/**
 * How many elements can hold in the queue
 */


function capacity(self) {
  ;
  return self.capacity;
}
/**
 * `true` if `shutdown` has been called.
 */


function isShutdown(self) {
  ;
  return self.isShutdown;
}
/**
 * Places one value in the queue.
 *
 * @ets_data_first offer_
 */


function offer(a) {
  return self => offer_(self, a);
}
/**
 * Places one value in the queue.
 */


function offer_(self, a) {
  ;
  return self.offer(a);
}
/**
 * Places one value in the queue.
 *
 * @ets_data_first offerTo_
 */


function offerTo(self) {
  return a => offer_(self, a);
}
/**
 * Places one value in the queue.
 *
 * @ets_data_first offerTo_
 */


function offerTo_(a, self) {
  return offer_(self, a);
}
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


function offerAll(as) {
  return self => offerAll_(self, as);
}
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


function offerAll_(self, as) {
  ;
  return self.offerAll(as);
}
/**
 * Interrupts any fibers that are suspended on `offer` or `take`.
 * Future calls to `offer*` and `take*` will be interrupted immediately.
 */


function shutdown(self) {
  ;
  return self.shutdown;
}
/**
 * Retrieves the size of the queue, which is equal to the number of elements
 * in the queue. This may be negative if fibers are suspended waiting for
 * elements to be added to the queue.
 */


function size(self) {
  ;
  return self.size;
}
/**
 * Removes the oldest value in the queue. If the queue is empty, this will
 * return a computation that resumes when an item has been added to the queue.
 */


function take(self) {
  ;
  return self.take;
}
/**
 * Removes all the values in the queue and returns the list of the values. If the queue
 * is empty returns empty list.
 */


function takeAll(self) {
  ;
  return self.takeAll;
}
/**
 * Takes up to max number of values in the queue.
 *
 * @ets_data_first takeAllUpTo_
 */


function takeAllUpTo(n) {
  return self => takeAllUpTo_(self, n);
}
/**
 * Takes up to max number of values in the queue.
 */


function takeAllUpTo_(self, n) {
  ;
  return self.takeUpTo(n);
}
//# sourceMappingURL=core.js.map