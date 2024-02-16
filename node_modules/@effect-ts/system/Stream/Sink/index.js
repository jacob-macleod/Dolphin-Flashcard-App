"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sink = void 0;
exports.accessM = accessM;
exports.as = as;
exports.as_ = as_;
exports.chain = chain;
exports.chain_ = chain_;
exports.collectAll = collectAll;
exports.collectAllToList = collectAllToList;
exports.collectAllToMap = collectAllToMap;
exports.collectAllToSet = collectAllToSet;
exports.collectAllWhileWith = collectAllWhileWith;
exports.contramap = contramap;
exports.contramapChunks = contramapChunks;
exports.contramapChunksM = contramapChunksM;
exports.contramapChunksM_ = contramapChunksM_;
exports.contramapChunks_ = contramapChunks_;
exports.contramapM = contramapM;
exports.contramapM_ = contramapM_;
exports.contramap_ = contramap_;
exports.count = void 0;
exports.die = die;
exports.dieMessage = dieMessage;
exports.dimap = dimap;
exports.dimapChunks = dimapChunks;
exports.dimapChunksM = dimapChunksM;
exports.dimapChunksM_ = dimapChunksM_;
exports.dimapChunks_ = dimapChunks_;
exports.dimapM = dimapM;
exports.dimapM_ = dimapM_;
exports.dimap_ = dimap_;
exports.drain = void 0;
exports.dropLeftover = dropLeftover;
exports.exposeLeftover = exposeLeftover;
exports.fail = fail;
exports.foldM = foldM;
exports.foldM_ = foldM_;
exports.forEach = forEach;
exports.forEachChunk = forEachChunk;
exports.forEachWhile = forEachWhile;
exports.foreachChunk = foreachChunk;
exports.fromEffect = fromEffect;
exports.fromHub = fromHub;
exports.fromHubWithShutdown = fromHubWithShutdown;
exports.fromPush = fromPush;
exports.fromQueue = fromQueue;
exports.fromQueueWithShutdown = fromQueueWithShutdown;
exports.halt = halt;
exports.head = head;
exports.last = last;
exports.managed = managed;
exports.managedPush = managedPush;
exports.managed_ = managed_;
exports.map = map;
exports.mapError = mapError;
exports.mapError_ = mapError_;
exports.mapM = mapM;
exports.mapM_ = mapM_;
exports.map_ = map_;
exports.provideAll = provideAll;
exports.provideAll_ = provideAll_;
exports.provideLayer = provideLayer;
exports.provideLayer_ = provideLayer_;
exports.provideSome = provideSome;
exports.provideSomeLayer = provideSomeLayer;
exports.provideSome_ = provideSome_;
exports.race = race;
exports.raceBoth = raceBoth;
exports.raceBoth_ = raceBoth_;
exports.race_ = race_;
exports.reduce = reduce;
exports.reduceChunks = reduceChunks;
exports.reduceChunksM = reduceChunksM;
exports.reduceLeft = reduceLeft;
exports.reduceLeftChunks = reduceLeftChunks;
exports.reduceLeftChunksM = reduceLeftChunksM;
exports.reduceLeftM = reduceLeftM;
exports.reduceM = reduceM;
exports.succeed = succeed;
exports.sum = void 0;
exports.take = take;
exports.timed = timed;
exports.timedDrain = void 0;
exports.toTransducer = toTransducer;
exports.untilOutputM = untilOutputM;
exports.untilOutputM_ = untilOutputM_;
exports.unwrap = unwrap;
exports.unwrapManaged = unwrapManaged;
exports.zip = zip;
exports.zipLeft = zipLeft;
exports.zipLeft_ = zipLeft_;
exports.zipPar = zipPar;
exports.zipParLeft = zipParLeft;
exports.zipParLeft_ = zipParLeft_;
exports.zipParRight = zipParRight;
exports.zipParRight_ = zipParRight_;
exports.zipPar_ = zipPar_;
exports.zipRight = zipRight;
exports.zipRight_ = zipRight_;
exports.zipWith = zipWith;
exports.zipWithPar = zipWithPar;
exports.zipWithPar_ = zipWithPar_;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

require("../../Operator/index.js");

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var _index3 = /*#__PURE__*/require("../../Clock/index.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var List = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/api.js"));

var _index8 = /*#__PURE__*/require("../../Function/index.js");

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Hub/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Layer/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var _index13 = /*#__PURE__*/require("../../Utils/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/fiber.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Push = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Push/index.js"));

var _index15 = /*#__PURE__*/require("../Transducer/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
// Important notes while writing sinks and combinators:
// - What return values for sinks mean:
//   Effect.unit - "need more values"
//   Effect.fail([Either.Right(z), l]) - "ended with z and emit leftover l"
//   Effect.fail([Either.Left(e), l]) - "failed with e and emit leftover l"
// - Result of processing of the stream using the sink must not depend on how the stream is chunked
//   (chunking-invariance)
//   pipe(stream, run(sink), Effect.either) === pipe(stream, chunkN(1), run(sink), Effect.either)
// - Sinks should always end when receiving a `None`. It is a defect to not end with some
//   sort of result (even a failure) when receiving a `None`.
// - Sinks can assume they will not be pushed again after emitting a value.
class Sink {
  constructor(push) {
    this.push = push;
  }

}
/**
 * Replaces this sink's result with the provided value.
 */


exports.Sink = Sink;

function as_(self, z) {
  return map_(self, _ => z);
}
/**
 * Replaces this sink's result with the provided value.
 */


function as(z) {
  return self => as_(self, z);
}
/**
 * Repeatedly runs the sink for as long as its results satisfy
 * the predicate `p`. The sink's results will be accumulated
 * using the stepping function `f`.
 */


function collectAllWhileWith(z) {
  return p => f => self => new Sink(M.chain_(R.makeManagedRef(z), acc => {
    return M.map_(Push.restartable(self.push), ({
      tuple: [push, restart]
    }) => {
      const go = (s, in_, end) => T.catchAll_(T.as_(push(in_), s), ({
        tuple: [e, leftover]
      }) => E.fold_(e, e => Push.fail(e, leftover), z => {
        if (p(z)) {
          const s1 = f(s, z);

          if (A.isEmpty(leftover)) {
            if (end) {
              return Push.emit(s1, A.empty());
            } else {
              return T.as_(restart, s1);
            }
          } else {
            return T.zipRight_(restart, go(s1, O.some(leftover), end));
          }
        } else {
          return Push.emit(s, leftover);
        }
      }));

      return in_ => T.chain_(acc.get, s => T.chain_(go(s, in_, O.isNone(in_)), s1 => acc.set(s1)));
    });
  }));
}
/**
 * Transforms this sink's input elements.
 */


function contramap_(self, f) {
  return contramapChunks_(self, A.map(f));
}
/**
 * Transforms this sink's input elements.
 */


function contramap(f) {
  return self => contramap_(self, f);
}
/**
 * Effectfully transforms this sink's input elements.
 */


function contramapM_(self, f) {
  return contramapChunksM_(self, A.mapEffect(f));
}
/**
 * Effectfully transforms this sink's input elements.
 */


function contramapM(f) {
  return self => contramapM_(self, f);
}
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */


function contramapChunks_(self, f) {
  return new Sink(M.map_(self.push, push => input => push(O.map_(input, f))));
}
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */


function contramapChunks(f) {
  return self => contramapChunks_(self, f);
}
/**
 * Effectfully transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */


function contramapChunksM_(self, f) {
  return new Sink(M.map_(self.push, push => {
    return input => O.fold_(input, () => push(O.none), value => T.chain_(T.mapError_(f(value), e => Tp.tuple(E.left(e), A.empty())), is => push(O.some(is))));
  }));
}
/**
 * Effectfully transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */


function contramapChunksM(f) {
  return self => contramapChunksM_(self, f);
}
/**
 * Transforms both inputs and result of this sink using the provided functions.
 */


function dimap_(self, f, g) {
  return map_(contramap_(self, f), g);
}
/**
 * Transforms both inputs and result of this sink using the provided functions.
 */


function dimap(f, g) {
  return self => dimap_(self, f, g);
}
/**
 * Effectfully transforms both inputs and result of this sink using the provided functions.
 */


function dimapM_(self, f, g) {
  return mapM_(contramapM_(self, f), g);
}
/**
 * Effectfully transforms both inputs and result of this sink using the provided functions.
 */


function dimapM(f, g) {
  return self => dimapM_(self, f, g);
}
/**
 * Transforms both input chunks and result of this sink using the provided functions.
 */


function dimapChunks_(self, f, g) {
  return map_(contramapChunks_(self, f), g);
}
/**
 * Transforms both input chunks and result of this sink using the provided functions.
 */


function dimapChunks(f, g) {
  return self => dimapChunks_(self, f, g);
}
/**
 * Effectfully transforms both input chunks and result of this sink using the provided functions.
 * `f` and `g` must preserve chunking-invariance
 */


function dimapChunksM_(self, f, g) {
  return mapM_(contramapChunksM_(self, f), g);
}
/**
 * Effectfully transforms both input chunks and result of this sink using the provided functions.
 * `f` and `g` must preserve chunking-invariance
 */


function dimapChunksM(f, g) {
  return self => dimapChunksM_(self, f, g);
}
/**
 * Runs this sink until it yields a result, then uses that result to create another
 * sink from the provided function which will continue to run until it yields a result.
 *
 * This function essentially runs sinks in sequence.
 */


function chain_(self, f) {
  return foldM_(self, e => fail(e)(), f);
}
/**
 * Runs this sink until it yields a result, then uses that result to create another
 * sink from the provided function which will continue to run until it yields a result.
 *
 * This function essentially runs sinks in sequence.
 */


function chain(f) {
  return self => chain_(self, f);
}
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * This method has better performance than `either` since no intermediate
 * value is allocated and does not require subsequent calls to `flatMap` to
 * define the next effect.
 *
 * The error parameter of the returned `IO` may be chosen arbitrarily, since
 * it will depend on the `IO`s returned by the given continuations.
 */


function foldM_(self, failure, success) {
  return new Sink(M.map_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "switched", () => T.toManaged(R.makeRef(false))), "thisPush", () => self.push), "thatPush", () => T.toManaged(R.makeRef(_ => T.unit))), "openThatPush", () => M.switchable()), ({
    openThatPush,
    switched,
    thatPush,
    thisPush
  }) => {
    return in_ => T.chain_(switched.get, sw => {
      if (!sw) {
        return T.catchAll_(thisPush(in_), v => {
          const leftover = v[1];
          const nextSink = E.fold_(v[0], failure, success);
          return T.chain_(T.tap_(openThatPush(nextSink.push), thatPush.set), p => T.zipRight_(switched.set(true), O.fold_(in_, () => T.zipRight_(T.when_(p(O.some(leftover)), () => !A.isEmpty(leftover)), p(O.none)), () => T.when_(p(O.some(leftover)), () => !A.isEmpty(leftover)))));
        });
      } else {
        return T.chain_(thatPush.get, p => p(in_));
      }
    });
  }));
}
/**
 * Recovers from errors by accepting one effect to execute for the case of an
 * error, and one effect to execute for the case of success.
 *
 * This method has better performance than `either` since no intermediate
 * value is allocated and does not require subsequent calls to `flatMap` to
 * define the next effect.
 *
 * The error parameter of the returned `IO` may be chosen arbitrarily, since
 * it will depend on the `IO`s returned by the given continuations.
 */


function foldM(failure, success) {
  return self => foldM_(self, failure, success);
}
/**
 * Transforms this sink's result.
 */


function map_(self, f) {
  return new Sink(M.map_(self.push, sink => inputs => T.mapError_(sink(inputs), e => Tp.tuple(E.map_(e.get(0), f), e.get(1)))));
}
/**
 * Transforms this sink's result.
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Transforms the errors emitted by this sink using `f`.
 */


function mapError_(self, f) {
  return new Sink(M.map_(self.push, p => {
    return in_ => T.mapError_(p(in_), e => Tp.tuple(E.mapLeft_(e.get(0), f), e.get(1)));
  }));
}
/**
 * Transforms the errors emitted by this sink using `f`.
 */


function mapError(f) {
  return self => mapError_(self, f);
}
/**
 * Effectfully transforms this sink's result.
 */


function mapM_(self, f) {
  return new Sink(M.map_(self.push, push => {
    return inputs => T.catchAll_(push(inputs), ({
      tuple: [e, left]
    }) => E.fold_(e, e => Push.fail(e, left), z => T.foldM_(f(z), e => Push.fail(e, left), z2 => Push.emit(z2, left))));
  }));
}
/**
 * Effectfully transforms this sink's result.
 */


function mapM(f) {
  return self => mapM_(self, f);
}
/**
 * Runs both sinks in parallel on the input, , returning the result or the error from the
 * one that finishes first.
 */


function race_(self, that) {
  return map_(raceBoth_(self, that), E.merge);
}
/**
 * Runs both sinks in parallel on the input, , returning the result or the error from the
 * one that finishes first.
 */


function race(that) {
  return self => race_(self, that);
}
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */


function raceBoth_(self, that) {
  return new Sink(M.map_(M.bind_(M.bind_(M.do, "p1", () => self.push), "p2", () => that.push), ({
    p1,
    p2
  }) => i => T.raceWith_(p1(i), p2(i), (res1, fib2) => Ex.foldM_(res1, f => T.zipRight_(F.interrupt(fib2), T.halt(C.map(({
    tuple: [r, leftover]
  }) => Tp.tuple(E.map_(r, E.left), leftover))(f))), () => T.mapError_(F.join(fib2), ({
    tuple: [r, leftover]
  }) => Tp.tuple(E.map_(r, E.right), leftover))), (res2, fib1) => Ex.foldM_(res2, f => T.zipRight_(F.interrupt(fib1), T.halt(C.map(({
    tuple: [r, leftover]
  }) => Tp.tuple(E.map_(r, E.right), leftover))(f))), () => T.mapError_(F.join(fib1), ({
    tuple: [r, leftover]
  }) => Tp.tuple(E.map_(r, E.left), leftover))))));
}
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */


function raceBoth(that) {
  return self => raceBoth_(self, that);
}
/**
 * Returns the sink that executes this one and times its execution.
 */


function timed(self) {
  return new Sink(M.zipWith_(self.push, T.toManaged(_index3.currentTime), (push, start) => {
    return in_ => T.catchAll_(push(in_), ({
      tuple: [e, leftover]
    }) => E.fold_(e, e => Push.fail(e, leftover), z => T.chain_(_index3.currentTime, stop => Push.emit(Tp.tuple(z, stop - start), leftover))));
  }));
}
/**
 * Converts this sink to a transducer that feeds incoming elements to the sink
 * and emits the sink's results as outputs. The sink will be restarted when
 * it ends.
 */


function toTransducer(self) {
  return (0, _index15.transducer)(M.map_(Push.restartable(self.push), ({
    tuple: [push, restart]
  }) => {
    const go = input => T.foldM_(push(input), ({
      tuple: [e, leftover]
    }) => E.fold_(e, e => T.fail(e), z => T.zipRight_(restart, A.isEmpty(leftover) || O.isNone(input) ? T.succeed(A.single(z)) : T.map_(go(O.some(leftover)), more => A.prepend_(more, z)))), _ => T.succeed(A.empty()));

    return input => go(input);
  }));
}
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, combining the two results in a tuple.
 */


function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, combining the two results in a tuple.
 */


function zip(that) {
  return self => zip_(self, that);
}
/**
 * Like `zip`, but keeps only the result from the `that` sink.
 */


function zipLeft_(self, that) {
  return zipWith_(self, that, z => z);
}
/**
 * Like `zip`, but keeps only the result from the `that` sink.
 */


function zipLeft(that) {
  return self => zipLeft_(self, that);
}
/**
 * Runs both sinks in parallel on the input and combines the results in a tuple.
 */


function zipPar_(self, that) {
  return zipWithPar_(self, that, Tp.tuple);
}
/**
 * Runs both sinks in parallel on the input and combines the results in a tuple.
 */


function zipPar(that) {
  return self => zipPar_(self, that);
}
/**
 * Like `zipPar`, but keeps only the result from this sink.
 */


function zipParLeft_(self, that) {
  return zipWithPar_(self, that, (b, _) => b);
}
/**
 * Like `zipPar`, but keeps only the result from this sink.
 */


function zipParLeft(that) {
  return self => zipParLeft_(self, that);
}
/**
 * Like `zipPar`, but keeps only the result from the `that` sink.
 */


function zipParRight_(self, that) {
  return zipWithPar_(self, that, (_, c) => c);
}
/**
 * Like `zipPar`, but keeps only the result from the `that` sink.
 */


function zipParRight(that) {
  return self => zipParRight_(self, that);
}
/**
 * Like `zip`, but keeps only the result from this sink.
 */


function zipRight_(self, that) {
  return zipWith_(self, that, (_, z1) => z1);
}
/**
 * Like `zip`, but keeps only the result from this sink.
 */


function zipRight(that) {
  return self => zipRight_(self, that);
}
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, finally combining the two results with `f`.
 */


function zipWith_(self, that, f) {
  return chain_(self, z => map_(that, _ => f(z, _)));
}
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, finally combining the two results with `f`.
 */


function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}

class BothRunning {
  constructor() {
    this._tag = "BothRunning";
  }

}

const bothRunning = /*#__PURE__*/new BothRunning();

class LeftDone {
  constructor(value) {
    this.value = value;
    this._tag = "LeftDone";
  }

}

class RightDone {
  constructor(value) {
    this.value = value;
    this._tag = "RightDone";
  }

}
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 */


function zipWithPar_(self, that, f) {
  return new Sink(M.map_(M.bind_(M.bind_(M.bind_(M.do, "ref", () => T.toManaged(R.makeRef(bothRunning))), "p1", () => self.push), "p2", () => that.push), ({
    p1,
    p2,
    ref
  }) => {
    return in_ => T.chain_(ref.get, state => {
      const newState = (0, _index13.matchTag)({
        BothRunning: () => {
          const l = T.foldM_(p1(in_), ({
            tuple: [e, l]
          }) => E.fold_(e, e => Push.fail(e, l), z => T.succeed(O.some(Tp.tuple(z, l)))), _ => T.succeed(O.none));
          const r = T.foldM_(p2(in_), ({
            tuple: [e, l]
          }) => E.fold_(e, e => Push.fail(e, l), z => T.succeed(O.some(Tp.tuple(z, l)))), _ => T.succeed(O.none));
          return T.chain_(T.zipPar_(l, r), ({
            tuple: [lr, rr]
          }) => {
            if (O.isSome(lr)) {
              const [z, l] = lr.value.tuple;

              if (O.isSome(rr)) {
                const [z1, l1] = rr.value.tuple;
                return T.fail(Tp.tuple(E.right(f(z, z1)), A.size(l) > A.size(l1) ? l1 : l));
              } else {
                return T.succeed(new LeftDone(z));
              }
            } else {
              if (O.isSome(rr)) {
                const [z1] = rr.value.tuple;
                return T.succeed(new RightDone(z1));
              } else {
                return T.succeed(bothRunning);
              }
            }
          });
        },
        LeftDone: ({
          value: z
        }) => T.as_(T.catchAll_(p2(in_), ({
          tuple: [e, leftover]
        }) => E.fold_(e, e => Push.fail(e, leftover), z1 => Push.emit(f(z, z1), leftover))), state),
        RightDone: ({
          value: z1
        }) => T.as_(T.catchAll_(p1(in_), ({
          tuple: [e, leftover]
        }) => E.fold_(e, e => Push.fail(e, leftover), z => Push.emit(f(z, z1), leftover))), state)
      })(state);
      return T.chain_(newState, ns => ns === state ? T.unit : ref.set(ns));
    });
  }));
}
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 */


function zipWithPar(that, f) {
  return self => zipWithPar_(self, that, f);
}
/**
 * Exposes leftover
 */


function exposeLeftover(self) {
  return new Sink(M.map_(self.push, p => {
    return in_ => T.mapError_(p(in_), ({
      tuple: [v, leftover]
    }) => Tp.tuple(E.map_(v, z => Tp.tuple(z, leftover)), A.empty()));
  }));
}
/**
 * Drops any leftover
 */


function dropLeftover(self) {
  return new Sink(M.map_(self.push, p => in_ => T.mapError_(p(in_), ({
    tuple: [v, _]
  }) => Tp.tuple(v, A.empty()))));
}

function untilOutputMGo(in_, end, push, restart, f) {
  return T.catchAll_(push(in_), ({
    tuple: [e, leftover]
  }) => E.fold_(e, e => Push.fail(e, leftover), z => T.chain_(T.mapError_(f(z), err => Tp.tuple(E.left(err), leftover)), satisfied => {
    if (satisfied) {
      return Push.emit(O.some(z), leftover);
    } else if (A.isEmpty(leftover)) {
      return end ? Push.emit(O.none, A.empty()) : T.zipRight_(restart, Push.more);
    } else {
      return untilOutputMGo(O.some(leftover), end, push, restart, f);
    }
  })));
}
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 */


function untilOutputM_(self, f) {
  return new Sink(M.map_(Push.restartable(self.push), ({
    tuple: [push, restart]
  }) => is => untilOutputMGo(is, O.isNone(is), push, restart, f)));
}
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 */


function untilOutputM(f) {
  return self => untilOutputM_(self, f);
}
/**
 * Provides the sink with its required environment, which eliminates
 * its dependency on `R`.
 */


function provideAll_(self, r) {
  return new Sink(M.map_(M.provideAll_(self.push, r), push => i => T.provideAll_(push(i), r)));
}
/**
 * Provides the sink with its required environment, which eliminates
 * its dependency on `R`.
 */


function provideAll(r) {
  return self => provideAll_(self, r);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */


function provideSome_(self, f) {
  return new Sink(M.map_(M.provideSome_(self.push, f), push => i => T.provideSome_(push(i), f)));
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */


function provideSome(f) {
  return self => provideSome_(self, f);
}
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 */


function provideLayer(layer) {
  return self => provideLayer_(self, layer);
}
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 */


function provideLayer_(self, layer) {
  return new Sink(M.chain_(L.build(layer), r => M.map_(M.provideAll_(self.push, r), push => i => T.provideAll_(push(i), r))));
}
/**
 * Splits the environment into two parts, providing one part using the
 * specified layer and leaving the remainder `R0`.
 */


function provideSomeLayer(layer) {
  return self => provideLayer(layer["+++"](L.identity()))(self);
}
/**
 * Creates a Sink from a managed `Push`
 */


function managedPush(push) {
  return new Sink(push);
}
/**
 * Accesses the environment of the sink in the context of a sink.
 */


function accessM(f) {
  return new Sink(M.chain_(M.environment(), env => f(env).push));
}
/**
 * A sink that collects all of its inputs into an array.
 */


function collectAll() {
  return reduceLeftChunks(A.empty())((s, i) => A.concat_(s, i));
}
/**
 * A sink that collects all of its inputs into an list.
 */


function collectAllToList() {
  return reduceLeftChunks(List.empty())((s, i) => List.concat_(s, List.from(i)));
}
/**
 * A sink that collects all of its inputs into a map. The keys are extracted from inputs
 * using the keying function `key`; if multiple inputs use the same key, they are merged
 * using the `f` function.
 */


function collectAllToMap(key) {
  return f => new Sink(M.suspend(() => reduceLeftChunks(new Map())((acc, as) => A.reduce_(as, acc, (acc, a) => {
    const k = key(a);
    const v = acc.get(k);
    return acc.set(k, v ? f(v, a) : a);
  })).push));
}
/**
 * A sink that collects all of its inputs into a set.
 */


function collectAllToSet() {
  return map_(collectAll(), as => new Set(as));
}
/**
 * A sink that counts the number of elements fed to it.
 */


const count = /*#__PURE__*/reduceLeft(0)((s, _) => s + 1);
/**
 * Creates a sink halting with the specified `Throwable`.
 */

exports.count = count;

function die(e) {
  return halt(C.die(e));
}
/**
 * Creates a sink halting with the specified message, wrapped in a
 * `RuntimeException`.
 */


function dieMessage(m) {
  return halt(C.die(new C.RuntimeError(m)));
}
/**
 * A sink that ignores its inputs.
 */


const drain = /*#__PURE__*/dropLeftover( /*#__PURE__*/forEach(_ => T.unit));
/**
 * A sink that always fails with the specified error.
 */

exports.drain = drain;

function fail(e) {
  return () => fromPush(c => {
    const leftover = O.fold_(c, () => A.empty(), x => x);
    return Push.fail(e, leftover);
  });
}

const reduceChunkGo = (s, chunk, idx, len, contFn, f) => {
  if (idx === len) {
    return [s, O.none];
  } else {
    const s1 = f(s, A.unsafeGet_(chunk, idx));

    if (contFn(s1)) {
      return reduceChunkGo(s1, chunk, idx + 1, len, contFn, f);
    } else {
      return [s1, O.some(A.drop_(chunk, idx + 1))];
    }
  }
};
/**
 * A sink that folds its inputs with the provided function, termination predicate and initial state.
 */


function reduce(z, contFn, f) {
  if (contFn(z)) {
    return new Sink(M.map_(M.bind_(M.do, "state", () => T.toManaged(R.makeRef(z))), ({
      state
    }) => is => O.fold_(is, () => T.chain_(state.get, s => Push.emit(s, A.empty())), is => T.chain_(state.get, s => {
      const [st, l] = reduceChunkGo(s, is, 0, A.size(is), contFn, f);
      return O.fold_(l, () => T.zipRight_(state.set(st), Push.more), leftover => Push.emit(st, leftover));
    }))));
  } else {
    return succeed(z);
  }
}
/**
 * A sink that folds its input chunks with the provided function, termination predicate and initial state.
 * `contFn` condition is checked only for the initial value and at the end of processing of each chunk.
 * `f` and `contFn` must preserve chunking-invariance.
 */


function reduceChunks(z) {
  return contFn => f => reduceChunksM(z)(contFn)((z, i) => T.succeed(f(z, i)));
}
/**
 * A sink that effectfully folds its input chunks with the provided function, termination predicate and initial state.
 * `contFn` condition is checked only for the initial value and at the end of processing of each chunk.
 * `f` and `contFn` must preserve chunking-invariance.
 */


function reduceChunksM(z) {
  return contFn => f => {
    if (contFn(z)) {
      return new Sink(M.map_(M.bind_(M.do, "state", () => T.toManaged(R.makeRef(z))), ({
        state
      }) => {
        return is => O.fold_(is, () => T.chain_(state.get, s => Push.emit(s, A.empty())), is => T.chain_(T.mapError_(T.chain_(state.get, _ => f(_, is)), e => Tp.tuple(E.left(e), A.empty())), s => {
          if (contFn(s)) {
            return T.zipRight_(state.set(s), Push.more);
          } else {
            return Push.emit(s, A.empty());
          }
        }));
      }));
    } else {
      return succeed(z);
    }
  };
}

function reduceMGo(s, chunk, idx, len, contFn, f) {
  if (idx === len) {
    return T.succeed([s, O.none]);
  } else {
    return T.foldM_(f(s, A.unsafeGet_(chunk, idx)), e => T.fail([e, A.drop_(chunk, idx + 1)]), s1 => contFn(s1) ? reduceMGo(s1, chunk, idx + 1, len, contFn, f) : T.succeed([s1, O.some(A.drop_(chunk, idx + 1))]));
  }
}
/**
 * A sink that effectfully folds its inputs with the provided function, termination predicate and initial state.
 *
 * This sink may terminate in the middle of a chunk and discard the rest of it. See the discussion on the
 * ZSink class scaladoc on sinks vs. transducers.
 */


function reduceM(z, contFn, f) {
  if (contFn(z)) {
    return new Sink(M.map_(M.bind_(M.do, "state", () => T.toManaged(R.makeRef(z))), ({
      state
    }) => is => O.fold_(is, () => T.chain_(state.get, s => Push.emit(s, A.empty())), is => T.chain_(state.get, s => T.foldM_(reduceMGo(s, is, 0, A.size(is), contFn, f), err => Push.fail(...err), ([st, l]) => O.fold_(l, () => T.zipRight_(state.set(st), Push.more), leftover => Push.emit(st, leftover)))))));
  } else {
    return succeed(z);
  }
}
/**
 * A sink that folds its inputs with the provided function and initial state.
 */


function reduceLeft(z) {
  return f => dropLeftover(reduce(z, _ => true, f));
}
/**
 * A sink that folds its input chunks with the provided function and initial state.
 * `f` must preserve chunking-invariance.
 */


function reduceLeftChunks(z) {
  return f => dropLeftover(reduceChunks(z)(() => true)(f));
}
/**
 * A sink that effectfully folds its input chunks with the provided function and initial state.
 * `f` must preserve chunking-invariance.
 */


function reduceLeftChunksM(z) {
  return f => dropLeftover(reduceChunksM(z)(_ => true)(f));
}
/**
 * A sink that effectfully folds its inputs with the provided function and initial state.
 */


function reduceLeftM(z) {
  return f => dropLeftover(reduceM(z, _ => true, f));
}

function forEachGo(chunk, idx, len, f) {
  if (idx === len) {
    return Push.more;
  } else {
    return T.foldM_(f(A.unsafeGet_(chunk, idx)), e => Push.fail(e, A.drop_(chunk, idx + 1)), () => forEachGo(chunk, idx + 1, len, f));
  }
}
/**
 * A sink that executes the provided effectful function for every element fed to it.
 */


function forEach(f) {
  return fromPush(O.fold(() => Push.emit(undefined, A.empty()), is => forEachGo(is, 0, A.size(is), f)));
}
/**
 * A sink that executes the provided effectful function for every chunk fed to it.
 */


function forEachChunk(f) {
  return fromPush(in_ => O.fold_(in_, () => Push.emit(undefined, A.empty()), is => T.zipRight_(T.mapError_(f(is), e => Tp.tuple(E.left(e), A.empty())), Push.more)));
}
/**
 * A sink that executes the provided effectful function for every element fed to it
 * until `f` evaluates to `false`.
 */


function forEachWhile(f) {
  const go = (chunk, idx, len) => {
    if (idx === len) {
      return Push.more;
    } else {
      return T.foldM_(f(A.unsafeGet_(chunk, idx)), e => Push.fail(e, A.drop_(chunk, idx + 1)), b => {
        if (b) {
          return go(chunk, idx + 1, len);
        } else {
          return Push.emit(undefined, A.drop_(chunk, idx));
        }
      });
    }
  };

  return fromPush(in_ => O.fold_(in_, () => Push.emit(undefined, A.empty()), is => go(is, 0, A.size(is))));
}
/**
 * Creates a single-value sink produced from an effect
 */


function fromEffect(b) {
  return () => fromPush(in_ => {
    const leftover = O.fold_(in_, () => A.empty(), _index8.identity);
    return T.foldM_(b, e => Push.fail(e, leftover), z => Push.emit(z, leftover));
  });
}
/**
 * Creates a sink from a Push
 */


function fromPush(push) {
  return new Sink(M.succeed(push));
}
/**
 * Creates a sink halting with a specified cause.
 */


function halt(e) {
  return fromPush(_ => Push.halt(e));
}
/**
 * Creates a sink containing the first value.
 */


function head() {
  return new Sink(M.succeed(in_ => O.fold_(in_, () => Push.emit(O.none, A.empty()), ch => A.isEmpty(ch) ? Push.more : Push.emit(A.head(ch), A.empty()))));
}
/**
 * Creates a sink containing the last value.
 */


function last() {
  return new Sink(M.map_(M.bind_(M.do, "state", () => T.toManaged(R.makeRef(O.none))), ({
    state
  }) => is => T.chain_(state.get, last => O.fold_(is, () => Push.emit(last, A.empty()), ch => O.fold_(A.last(ch), () => Push.more, l => T.zipRight_(state.set(O.some(l)), Push.more))))));
}
/**
 * A sink that depends on another managed value
 * `resource` will be finalized after the processing.
 *
 * @deprecated Use unwrapManaged
 */


function managed_(resource, fn) {
  return M.chain_(M.fold_(resource, err => fail(err)(), m => fn(m)), _ => _.push);
}
/**
 * A sink that depends on another managed value
 * `resource` will be finalized after the processing.
 *
 * @deprecated Use unwrapManaged
 */


function managed(resource) {
  return fn => managed_(resource, fn);
}
/**
 * A sink that immediately ends with the specified value.
 */


function succeed(z) {
  return fromPush(c => {
    const leftover = O.fold_(c, () => A.empty(), x => x);
    return Push.emit(z, leftover);
  });
}
/**
 * A sink that sums incoming numeric values.
 */


const sum = /*#__PURE__*/reduceLeft(0)((a, b) => a + b);
/**
 * A sink that takes the specified number of values.
 */

exports.sum = sum;

function take(n) {
  return new Sink(M.map_(M.bind_(M.do, "state", () => T.toManaged(R.makeRef(A.empty()))), ({
    state
  }) => {
    return is => T.chain_(state.get, take => O.fold_(is, () => {
      if (n >= 0) {
        return Push.emit(take, A.empty());
      } else {
        return Push.emit(A.empty(), take);
      }
    }, ch => {
      const remaining = n - A.size(take);

      if (remaining <= A.size(ch)) {
        const {
          tuple: [chunk, leftover]
        } = A.splitAt_(ch, remaining);
        return T.zipRight_(state.set(A.empty()), Push.emit(A.concat_(take, chunk), leftover));
      } else {
        return T.zipRight_(state.set(A.concat_(take, ch)), Push.more);
      }
    }));
  }));
}
/**
 * A sink with timed execution.
 */


const timedDrain = /*#__PURE__*/map_( /*#__PURE__*/timed(drain), _ => _.get(1));
/**
 * A sink that executes the provided effectful function for every chunk fed to it.
 */

exports.timedDrain = timedDrain;

function foreachChunk(f) {
  return fromPush(o => O.fold_(o, () => Push.emit(undefined, A.empty()), is => T.zipRight_(T.mapError_(f(is), e => Tp.tuple(E.left(e), A.empty())), Push.more)));
}
/**
 * Create a sink which enqueues each element into the specified queue.
 */


function fromQueue(queue) {
  return forEachChunk(x => Q.offerAll_(queue, x));
}
/**
 * Create a sink which enqueues each element into the specified queue.
 * The queue will be shutdown once the stream is closed.
 */


function fromQueueWithShutdown(queue) {
  return new Sink(M.chain_(M.map_(M.make_(T.succeed(queue), Q.shutdown), fromQueue), _ => _.push));
}
/**
 * Create a sink which publishes each element to the specified hub.
 */


function fromHub(hub) {
  return fromQueue(H.toQueue(hub));
}
/**
 * Create a sink which publishes each element to the specified hub.
 * The hub will be shutdown once the stream is closed.
 */


function fromHubWithShutdown(hub) {
  return fromQueueWithShutdown(H.toQueue(hub));
}
/**
 * Creates a sink produced from an effect.
 */


function unwrap(effect) {
  return unwrapManaged(T.toManaged(effect));
}
/**
 * Creates a sink produced from a managed effect.
 */


function unwrapManaged(managed) {
  return new Sink(M.chain_(M.fold_(managed, err => fail(err)(), _ => _), _ => _.push));
}
//# sourceMappingURL=index.js.map