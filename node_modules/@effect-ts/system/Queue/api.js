"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BackPressureStrategy", {
  enumerable: true,
  get: function () {
    return exclForEach.BackPressureStrategy;
  }
});
exports.both = both;
exports.bothWith = bothWith;
exports.bothWithM = bothWithM;
exports.bothWithM_ = bothWithM_;
exports.bothWith_ = bothWith_;
exports.both_ = both_;
exports.contramap = contramap;
exports.contramapM = contramapM;
exports.contramapM_ = contramapM_;
exports.contramap_ = contramap_;
Object.defineProperty(exports, "createQueue", {
  enumerable: true,
  get: function () {
    return exclForEach.createQueue;
  }
});
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
Object.defineProperty(exports, "makeBounded", {
  enumerable: true,
  get: function () {
    return exclForEach.makeBoundedQueue;
  }
});
exports.makeDropping = makeDropping;
exports.makeSliding = makeSliding;
exports.makeUnbounded = makeUnbounded;
exports.map = map;
exports.mapM = mapM;
exports.mapM_ = mapM_;
exports.map_ = map_;
exports.poll = poll;
exports.takeBetween = takeBetween;
exports.takeBetween_ = takeBetween_;
Object.defineProperty(exports, "unsafeCreate", {
  enumerable: true,
  get: function () {
    return exclForEach.unsafeCreateQueue;
  }
});

var _collect = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/collect.js");

var _filterEffect = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/filterEffect.js");

var _mapEffect = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/mapEffect.js");

var _zip = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/zip.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var _core2 = /*#__PURE__*/require("../Effect/core.js");

var exclForEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Effect/excl-forEach.js"));

var _index = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _index3 = /*#__PURE__*/require("../Support/MutableQueue/index.js");

var _core3 = /*#__PURE__*/require("./core.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./effect-api.js"));

var _xqueue = /*#__PURE__*/require("./xqueue.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a sliding queue
 */
function makeSliding(capacity) {
  return T.chain_(T.succeedWith(() => new _index3.Bounded(capacity)), exclForEach.createQueue(new _core3.SlidingStrategy()));
}
/**
 * Creates a unbouded queue
 */


function makeUnbounded() {
  return T.chain_(T.succeedWith(() => new _index3.Unbounded()), exclForEach.createQueue(new _core3.DroppingStrategy()));
}
/**
 * Creates a dropping queue
 */


function makeDropping(capacity) {
  return T.chain_(T.succeedWith(() => new _index3.Bounded(capacity)), exclForEach.createQueue(new _core3.DroppingStrategy()));
}

function takeRemainderLoop(self, n) {
  ;

  if (n <= 0) {
    return T.succeed(Chunk.empty());
  } else {
    return T.chain_(self.take, a => T.map_(takeRemainderLoop(self, n - 1), _ => Chunk.append_(_, a)));
  }
}
/**
 * Takes between min and max number of values from the queue. If there
 * is less than min items available, it'll block until the items are
 * collected.
 *
 * @ets_data_first takeBetween_
 */


function takeBetween(min, max) {
  return self => takeBetween_(self, min, max);
}
/**
 * Takes between min and max number of values from the queue. If there
 * is less than min items available, it'll block until the items are
 * collected.
 */


function takeBetween_(self, min, max) {
  ;

  if (max < min) {
    return T.succeed(Chunk.empty());
  } else {
    return T.chain_(self.takeUpTo(max), bs => {
      const remaining = min - Chunk.size(bs);

      if (remaining === 1) {
        return T.map_(self.take, b => Chunk.append_(bs, b));
      } else if (remaining > 1) {
        return T.map_(takeRemainderLoop(self, remaining), list => Chunk.concat_(bs, list));
      } else {
        return T.succeed(bs);
      }
    });
  }
}
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


function bothWithM(that, f) {
  return self => bothWithM_(self, that, f);
}
/**
 * Creates a new queue from this queue and another. Offering to the composite queue
 * will broadcast the elements to both queues; taking from the composite queue
 * will dequeue elements from both queues and apply the function point-wise.
 *
 * Note that using queues with different strategies may result in surprising behavior.
 * For example, a dropping queue and a bounded queue composed together may apply `f`
 * to different elements.
 */


function bothWithM_(self, that, f) {
  ;
  ;
  return new BothWithM(self, that, f);
}

class BothWithM extends _xqueue.XQueueInternal {
  constructor(self, that, f) {
    super();
    this.self = self;
    this.that = that;
    this.f = f;
    this.awaitShutdown = T.chain_(this.self.awaitShutdown, () => this.that.awaitShutdown);
    this.capacity = Math.min(this.self.capacity, this.that.capacity);
    this.isShutdown = this.self.isShutdown;
    this.shutdown = T.zipWithPar_(this.self.shutdown, this.that.shutdown, () => undefined);
    this.size = T.zipWithPar_(this.self.size, this.that.size, (x, y) => Math.max(x, y));
    this.take = T.chain_(T.zipPar_(this.self.take, this.that.take), ({
      tuple: [b, c]
    }) => this.f(b, c));
    this.takeAll = T.chain_(T.zipPar_(this.self.takeAll, this.that.takeAll), ({
      tuple: [bs, cs]
    }) => (0, _mapEffect.mapEffect_)((0, _zip.zip_)(bs, cs), ({
      tuple: [b, c]
    }) => this.f(b, c)));
  }

  offer(a) {
    return T.zipWithPar_(this.self.offer(a), this.that.offer(a), (x, y) => x && y);
  }

  offerAll(as) {
    return T.zipWithPar_(this.self.offerAll(as), this.that.offerAll(as), (x, y) => x && y);
  }

  takeUpTo(max) {
    return T.chain_(T.zipPar_(this.self.takeUpTo(max), this.that.takeUpTo(max)), ({
      tuple: [bs, cs]
    }) => (0, _mapEffect.mapEffect_)((0, _zip.zip_)(bs, cs), ({
      tuple: [b, c]
    }) => this.f(b, c)));
  }

}
/**
 * Like `bothWithM`, but uses a pure function.
 *
 * @ets_data_first bothWith_
 */


function bothWith(that, f) {
  return self => bothWithM_(self, that, (b, c) => T.succeed(f(b, c)));
}
/**
 * Like `bothWithM`, but uses a pure function.
 */


function bothWith_(self, that, f) {
  return bothWithM_(self, that, (b, c) => T.succeed(f(b, c)));
}
/**
 * Like `bothWith`, but tuples the elements instead of applying a function.
 *
 * @ets_data_first both_
 */


function both(that) {
  return self => bothWith_(self, that, (b, c) => (0, _index.tuple)(b, c));
}
/**
 * Like `bothWith`, but tuples the elements instead of applying a function.
 */


function both_(self, that) {
  return bothWith_(self, that, (b, c) => (0, _index.tuple)(b, c));
}
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 *
 * @ets_data_first dimap_
 */


function dimap(f, g) {
  return self => dimap_(self, f, g);
}
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 */


function dimap_(self, f, g) {
  return dimapM_(self, c => (0, _core2.succeed)(f(c)), b => (0, _core2.succeed)(g(b)));
}
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 *
 * @ets_data_first dimapM_
 */


function dimapM(f, g) {
  return self => dimapM_(self, f, g);
}
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 */


function dimapM_(self, f, g) {
  ;
  return new DimapM(self, f, g);
}

class DimapM extends _xqueue.XQueueInternal {
  constructor(self, f, g) {
    super();
    this.self = self;
    this.f = f;
    this.g = g;
    this.awaitShutdown = this.self.awaitShutdown;
    this.capacity = this.self.capacity;
    this.isShutdown = this.self.isShutdown;
    this.shutdown = this.self.shutdown;
    this.size = this.self.size;
    this.take = T.chain_(this.self.take, this.g);
    this.takeAll = T.chain_(this.self.takeAll, a => (0, _mapEffect.mapEffect_)(a, this.g));
  }

  offer(a) {
    return T.chain_(this.f(a), a => this.self.offer(a));
  }

  offerAll(as) {
    return T.chain_(T.forEach_(as, this.f), as => this.self.offerAll(as));
  }

  takeUpTo(n) {
    return T.chain_(this.self.takeUpTo(n), bs => (0, _mapEffect.mapEffect_)(bs, this.g));
  }

}
/**
 * Transforms elements enqueued into this queue with an effectful function.
 */


function contramapM_(self, f) {
  return dimapM_(self, f, _core2.succeed);
}
/**
 * Transforms elements enqueued into this queue with an effectful function.
 *
 * @ets_data_first contramapM_
 */


function contramapM(f) {
  return self => contramapM_(self, f);
}
/**
 * Transforms elements enqueued into this queue with a pure function.
 */


function contramap_(self, f) {
  return dimapM_(self, c => (0, _core2.succeed)(f(c)), _core2.succeed);
}
/**
 * Transforms elements enqueued into this queue with a pure function.
 *
 * @ets_data_first contramap_
 */


function contramap(f) {
  return self => contramap_(self, f);
}
/**
 * Like `filterInput`, but uses an effectful function to filter the elements.
 *
 * @ets_data_first filterInputM_
 */


function filterInputM(f) {
  return self => filterInputM_(self, f);
}
/**
 * Like `filterInput`, but uses an effectful function to filter the elements.
 */


function filterInputM_(self, f) {
  ;
  return new FilterInputM(self, f);
}

class FilterInputM extends _xqueue.XQueueInternal {
  constructor(self, f) {
    super();
    this.self = self;
    this.f = f;
    this.awaitShutdown = this.self.awaitShutdown;
    this.capacity = this.self.capacity;
    this.isShutdown = this.self.isShutdown;
    this.shutdown = this.self.shutdown;
    this.size = this.self.size;
    this.take = this.self.take;
    this.takeAll = this.self.takeAll;
  }

  offer(a) {
    return T.chain_(this.f(a), b => b ? this.self.offer(a) : T.succeed(false));
  }

  offerAll(as) {
    return T.chain_(T.forEach_(as, a => T.map_(this.f(a), b => b ? O.some(a) : O.none)), maybeAs => {
      const filtered = (0, _collect.collect_)(maybeAs, _index.identity);

      if (Chunk.isEmpty(filtered)) {
        return T.succeed(false);
      } else {
        return this.self.offerAll(filtered);
      }
    });
  }

  takeUpTo(n) {
    return this.self.takeUpTo(n);
  }

}
/**
 * Filters elements dequeued from the queue using the specified effectual
 * predicate.
 */


function filterOutputM_(self, f) {
  ;
  return new FilterOutputM(self, f);
}

class FilterOutputM extends _xqueue.XQueueInternal {
  constructor(self, f) {
    super();
    this.self = self;
    this.f = f;
    this.awaitShutdown = this.self.awaitShutdown;
    this.capacity = this.self.capacity;
    this.isShutdown = this.self.isShutdown;
    this.shutdown = this.self.shutdown;
    this.size = this.self.size;
    this.take = T.chain_(this.self.take, b => {
      return T.chain_(this.f(b), p => {
        return p ? T.succeed(b) : this.take;
      });
    });
    this.takeAll = T.chain_(this.self.takeAll, bs => (0, _filterEffect.filterEffect_)(bs, this.f));
  }

  offer(a) {
    return this.self.offer(a);
  }

  offerAll(as) {
    return this.self.offerAll(as);
  }

  loop(max, acc) {
    return T.chain_(this.self.takeUpTo(max), bs => {
      if (Chunk.isEmpty(bs)) {
        return T.succeed(acc);
      }

      return T.chain_((0, _filterEffect.filterEffect_)(bs, this.f), filtered => {
        const length = Chunk.size(filtered);

        if (length === max) {
          return T.succeed(Chunk.concat_(acc, filtered));
        } else {
          return this.loop(max - length, Chunk.concat_(acc, filtered));
        }
      });
    });
  }

  takeUpTo(n) {
    return T.suspend(() => {
      return this.loop(n, Chunk.empty());
    });
  }

}
/**
 * Filters elements dequeued from the queue using the specified effectual
 * predicate.
 *
 * @ets_data_first filterOutputM_
 */


function filterOutputM(f) {
  return self => filterOutputM_(self, f);
}
/**
 * Filters elements dequeued from the queue using the specified predicate.
 */


function filterOutput_(self, f) {
  return filterOutputM_(self, b => T.succeed(f(b)));
}
/**
 * Filters elements dequeued from the queue using the specified predicate.
 *
 * @ets_data_first filterOutput_
 */


function filterOutput(f) {
  return self => filterOutput_(self, f);
}
/**
 * Applies a filter to elements enqueued into this queue. Elements that do not
 * pass the filter will be immediately dropped.
 *
 * @ets_data_first filterInput_
 */


function filterInput(f) {
  return self => filterInput_(self, f);
}
/**
 * Applies a filter to elements enqueued into this queue. Elements that do not
 * pass the filter will be immediately dropped.
 */


function filterInput_(self, f) {
  return filterInputM_(self, a => T.succeed(f(a)));
}
/**
 * Transforms elements dequeued from this queue with a function.
 */


function map_(self, f) {
  return mapM_(self, _ => T.succeed(f(_)));
}
/**
 * Transforms elements dequeued from this queue with a function.
 *
 * @ets_data_first map_
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Transforms elements dequeued from this queue with an effectful function.
 *
 * @ets_data_first mapM_
 */


function mapM(f) {
  return self => mapM_(self, f);
}
/**
 * Transforms elements dequeued from this queue with an effectful function.
 */


function mapM_(self, f) {
  return dimapM_(self, a => T.succeed(a), f);
}
/**
 * Take the head option of values in the queue.
 */


function poll(self) {
  ;
  return T.map_(self.takeUpTo(1), x => Chunk.unsafeGet_(x, 0));
}
//# sourceMappingURL=api.js.map