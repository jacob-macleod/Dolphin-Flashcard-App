"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackPressureStrategy = void 0;
exports.collectAll = collectAll;
exports.collectAllPar = collectAllPar;
exports.collectAllParN = collectAllParN;
exports.collectAllParN_ = collectAllParN_;
exports.collectAllSuccesses = collectAllSuccesses;
exports.collectAllSuccessesPar = collectAllSuccessesPar;
exports.collectAllSuccessesParN = collectAllSuccessesParN;
exports.collectAllSuccessesParN_ = collectAllSuccessesParN_;
exports.collectAllUnit = collectAllUnit;
exports.collectAllUnitPar = collectAllUnitPar;
exports.collectAllUnitParN = collectAllUnitParN;
exports.collectAllUnitParN_ = collectAllUnitParN_;
exports.collectAllWith = collectAllWith;
exports.collectAllWithPar = collectAllWithPar;
exports.collectAllWithParN = collectAllWithParN;
exports.collectAllWithParN_ = collectAllWithParN_;
exports.collectAllWithPar_ = collectAllWithPar_;
exports.collectAllWith_ = collectAllWith_;
exports.createQueue = createQueue;
exports.createQueue_ = createQueue_;
exports.fiberJoinAll = fiberJoinAll;
exports.fiberWaitAll = fiberWaitAll;
exports.forEach = forEach;
exports.forEachExec = forEachExec;
exports.forEachExec_ = forEachExec_;
exports.forEachPar = forEachPar;
exports.forEachParN = forEachParN;
exports.forEachParN_ = forEachParN_;
exports.forEachParWithIndex = forEachParWithIndex;
exports.forEachParWithIndexN = forEachParWithIndexN;
exports.forEachParWithIndexN_ = forEachParWithIndexN_;
exports.forEachParWithIndex_ = forEachParWithIndex_;
exports.forEachPar_ = forEachPar_;
exports.forEachUnit = forEachUnit;
exports.forEachUnitPar = forEachUnitPar;
exports.forEachUnitParN = forEachUnitParN;
exports.forEachUnitParN_ = forEachUnitParN_;
exports.forEachUnitPar_ = forEachUnitPar_;
exports.forEachUnit_ = forEachUnit_;
exports.forEachWithIndex = forEachWithIndex;
exports.forEachWithIndex_ = forEachWithIndex_;
exports.forEach_ = forEach_;
exports.forkManaged = forkManaged;
exports.makeBoundedQueue = makeBoundedQueue;
exports.managedFork = managedFork;
exports.managedUse_ = managedUse_;
exports.releaseMapReleaseAll = releaseMapReleaseAll;
exports.unsafeCreateQueue = unsafeCreateQueue;

var cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/index.js"));

var ChunkCollect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/collect.js"));

var ChunkFilter = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/filter.js"));

var ChunkForEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/forEach.js"));

var ChunkIndexWhere = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/indexWhere.js"));

var ChunkSplitAt = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/splitAt.js"));

var ChunkZip = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/api/zip.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/List/core.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/index.js"));

var _interrupt = /*#__PURE__*/require("../Fiber/interrupt.js");

var _index4 = /*#__PURE__*/require("../Function/index.js");

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Iterable/index.js"));

var _managed = /*#__PURE__*/require("../Managed/managed.js");

var _add = /*#__PURE__*/require("../Managed/ReleaseMap/add.js");

var _Exited = /*#__PURE__*/require("../Managed/ReleaseMap/Exited.js");

var _makeReleaseMap = /*#__PURE__*/require("../Managed/ReleaseMap/makeReleaseMap.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Queue/core.js"));

var _xqueue = /*#__PURE__*/require("../Queue/xqueue.js");

var _index7 = /*#__PURE__*/require("../Support/AtomicBoolean/index.js");

var _index8 = /*#__PURE__*/require("../Support/MutableQueue/index.js");

var asUnit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./asUnit.js"));

var bracket = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./bracket.js"));

var _bracketExit = /*#__PURE__*/require("./bracketExit.js");

var catchAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchAll.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var coreScope = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core-scope.js"));

var Do = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./do.js"));

var _done = /*#__PURE__*/require("./done.js");

var ensuring = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ensuring.js"));

var _environment = /*#__PURE__*/require("./environment.js");

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./excl-deps-ref.js"));

var promise = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./excl-forEach-promise.js"));

var _ExecutionStrategy = /*#__PURE__*/require("./ExecutionStrategy.js");

var fiberId = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fiberId.js"));

var flatten = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./flatten.js"));

var ifM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ifM.js"));

var interruption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruption.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var _provideSome = /*#__PURE__*/require("./provideSome.js");

var tap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./tap.js"));

var tapCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./tapCause.js"));

var _toManaged = /*#__PURE__*/require("./toManaged.js");

var whenM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./whenM.js"));

var zips = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zips.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 */
function forEach_(as, f, __trace) {
  return core.suspend(() => {
    const acc = [];
    return map.map_(forEachUnit_(as, a => map.map_(f(a), b => {
      acc.push(b);
    })), () => Chunk.from(acc));
  }, __trace);
}
/**
 * Same as `forEach_`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */


function forEachWithIndex_(as, f, __trace) {
  return core.suspend(() => {
    let index = 0;
    const acc = [];
    return map.map_(forEachUnit_(as, a => map.map_(f(a, index), b => {
      acc.push(b);
      index++;
    })), () => Chunk.from(acc));
  }, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 *
 * @ets_data_first forEach_
 */


function forEach(f, __trace) {
  return as => forEach_(as, f, __trace);
}
/**
 * Same as `forEach`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @ets_data_first forEachWithIndex_
 */


function forEachWithIndex(f, __trace) {
  return as => forEachWithIndex_(as, f, __trace);
}

function forEachUnitLoop(iterator, f) {
  const next = iterator.next();
  return next.done ? core.unit : core.chain_(f(next.value), () => forEachUnitLoop(iterator, f));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 */


function forEachUnit_(as, f, __trace) {
  return core.suspend(() => forEachUnitLoop(as[Symbol.iterator](), f), __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */


function forEachUnit(f, __trace) {
  return as => forEachUnit_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEach_`.
 *
 * Optimized to avoid keeping full tree of effects, so that method could be
 * able to handle large input sequences.
 * Behaves almost like this code:
 *
 * Additionally, interrupts all effects on any failure.
 */


function forEachUnitPar_(as, f, __trace) {
  const collection = L.from(as);
  const size = L.size(collection);

  if (L.isEmpty(collection)) {
    return core.unit;
  }

  return core.suspend(() => asUnit.asUnit(tap.tap_(tap.tap_(Do.let_(Do.bind_(Do.let_(Do.let_(Do.let_(Do.bind_(Do.bind_(Do.bind_(Do.bind_(Do.do, "parentId", () => fiberId.fiberId), "causes", () => Ref.makeRef(cause.empty)), "result", () => promise.make()), "status", () => Ref.makeRef(Tp.tuple(0, 0, false))), "startTask", ({
    status
  }) => Ref.modify_(status, ({
    tuple: [started, done, failing]
  }) => {
    if (failing) {
      return Tp.tuple(false, Tp.tuple(started, done, failing));
    }

    return Tp.tuple(true, Tp.tuple(started + 1, done, failing));
  })), "startFailure", ({
    result,
    status
  }) => zips.zipRight_(Ref.update_(status, ({
    tuple: [started, done, _]
  }) => Tp.tuple(started, done, true)), promise.fail(undefined)(result))), "task", ({
    causes,
    parentId,
    result,
    startFailure,
    startTask,
    status
  }) => a => interruption.uninterruptible(ifM.ifM_(startTask, () => ensuring.ensuring_(tapCause.tapCause_(interruption.interruptible(core.suspend(() => f(a))), c => zips.zipRight_(Ref.update_(causes, _ => cause.combinePar(_, c)), startFailure)), (() => {
    const isComplete = Ref.modify_(status, ({
      tuple: [started, done, failing]
    }) => {
      const newDone = done + 1;
      return Tp.tuple((failing ? started : size) === newDone, Tp.tuple(started, newDone, failing));
    });
    return whenM.whenM_(promise.succeed(undefined)(result), isComplete);
  })()), () => Ref.update_(causes, _ => cause.combinePar(_, cause.interrupt(parentId)))))), "fibers", ({
    task
  }) => coreScope.transplant(graft => forEach_(collection, a => core.fork(graft(task(a)))))), "interrupter", ({
    fibers,
    parentId,
    result
  }) => forkManaged(catchAll.catchAll_(promise.await(result), () => core.chain_(forEach_(fibers, _ => core.fork(_.interruptAs(parentId))), fiberJoinAll)))), ({
    causes,
    fibers,
    interrupter,
    result
  }) => managedUse_(interrupter, () => whenM.whenM_(zips.zipRight_(promise.fail(undefined)(result), core.chain_(causes.get, core.halt)), map.map_(forEach_(fibers, _ => _.await), _ => ChunkIndexWhere.indexWhere_(_, ex => !Ex.succeeded(ex)) !== -1)))), ({
    fibers
  }) => forEach_(fibers, _ => _.inheritRefs))), __trace);
}
/**
 * Forks the fiber in a `Managed`. Using the `Managed` value will
 * execute the effect in the fiber, while ensuring its interruption when
 * the effect supplied to `use` completes.
 */


function forkManaged(self, __trace) {
  return managedFork((0, _toManaged.toManaged)(self), __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects in parallel, discarding the results.
 *
 * For a sequential version of this method, see `forEach_`.
 *
 * Optimized to avoid keeping full tree of effects, so that method could be
 * able to handle large input sequences.
 * Behaves almost like this code:
 *
 * Additionally, interrupts all effects on any failure.
 *
 * @ets_data_first forEachUnitPar_
 */


function forEachUnitPar(f, __trace) {
  return as => forEachUnitPar_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 */


function forEachPar_(as, f, __trace) {
  return core.suspend(() => core.chain_(core.succeedWith(() => []), array => map.map_(forEachUnitPar_(I.map_(as, (a, n) => [a, n]), ([a, n]) => core.chain_(core.suspend(() => f(a)), b => core.succeedWith(() => {
    array[n] = b;
  }))), () => Chunk.from(array))), __trace);
}
/**
 * Same as `forEachPar_`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */


function forEachParWithIndex_(as, f, __trace) {
  return core.suspend(() => core.chain_(core.succeedWith(() => []), array => map.map_(forEachUnitPar_(I.map_(as, (a, n) => [a, n]), ([a, n]) => core.chain_(core.suspend(() => f(a, n)), b => core.succeedWith(() => {
    array[n] = b;
  }))), () => Chunk.from(array))), __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachPar_
 */


function forEachPar(f, __trace) {
  return as => forEachPar_(as, f, __trace);
}
/**
 * Same as `forEachPar`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */


function forEachParWithIndex(f, __trace) {
  return as => forEachParWithIndex_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * Unlike `forEachUnitPar_`, this method will use at most up to `n` fibers.
 */


function forEachUnitParN_(as, n, f, __trace) {
  const as_ = L.from(as);
  const size = L.size(as_);

  function worker(q, ref) {
    return whenM.whenM_(core.chain_(core.chain_(Q.take(q), f), () => worker(q, ref)), Ref.modify_(ref, n => Tp.tuple(n > 0, n - 1)));
  }

  return core.suspend(() => bracket.bracket_(makeBoundedQueue(n), q => tap.tap_(Do.bind_(tap.tap_(Do.bind_(Do.do, "ref", () => Ref.makeRef(size)), () => core.fork(forEachUnit_(as, x => Q.offer_(q, x)))), "fibers", ({
    ref
  }) => collectAll(L.map_(L.range_(0, n), () => core.fork(worker(q, ref))))), ({
    fibers
  }) => forEach_(fibers, _ => _.await)), q => Q.shutdown(q)), __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * Unlike `forEachUnitPar_`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first forEachUnitParN_
 */


function forEachUnitParN(n, f, __trace) {
  return as => forEachUnitParN_(as, n, f, __trace);
}
/**
 * Applies the functionw `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * Unlike `forEachPar`, this method will use at most up to `n` fibers.
 */


function forEachParN_(as, n, f, __trace) {
  function worker(q, pairs, ref) {
    return whenM.whenM_(core.chain_(core.chain_(Q.take(q), ({
      tuple: [p, a]
    }) => core.foldCauseM_(core.suspend(() => f(a)), c => forEach_(pairs, _ => promise.halt(c)(_.get(0))), b => promise.succeed(b)(p))), () => worker(q, pairs, ref)), Ref.modify_(ref, n => Tp.tuple(n > 0, n - 1)));
  }

  return core.suspend(() => bracket.bracket_(makeBoundedQueue(n), q => core.chain_(tap.tap_(tap.tap_(Do.bind_(Do.bind_(Do.do, "pairs", () => forEach_(as, a => map.map_(promise.make(), p => Tp.tuple(p, a)))), "ref", ({
    pairs
  }) => Ref.makeRef(Chunk.size(pairs))), ({
    pairs
  }) => core.fork(forEach_(pairs, pair => Q.offer_(q, pair)))), ({
    pairs,
    ref
  }) => collectAllUnit(L.map(() => core.fork(worker(q, pairs, ref)))(L.range_(0, n)))), ({
    pairs
  }) => forEach_(pairs, _ => promise.await(_.get(0)))), Q.shutdown), __trace);
}
/**
 * Same as `forEachParN_`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */


function forEachParWithIndexN_(as, n, f, __trace) {
  function worker(q, pairs, ref) {
    return whenM.whenM_(core.chain_(core.chain_(Q.take(q), ({
      tuple: [p, a, i]
    }) => core.foldCauseM_(core.suspend(() => f(a, i)), c => forEach_(pairs, _ => promise.halt(c)(_.get(0))), b => promise.succeed(b)(p))), () => worker(q, pairs, ref)), Ref.modify_(ref, n => Tp.tuple(n > 0, n - 1)));
  }

  return core.suspend(() => bracket.bracket_(makeBoundedQueue(n), q => core.chain_(tap.tap_(tap.tap_(Do.bind_(Do.bind_(Do.do, "pairs", () => forEachWithIndex_(as, (a, i) => map.map_(promise.make(), p => Tp.tuple(p, a, i)))), "ref", ({
    pairs
  }) => Ref.makeRef(Chunk.size(pairs))), ({
    pairs
  }) => core.fork(forEach_(pairs, pair => Q.offer_(q, pair)))), ({
    pairs,
    ref
  }) => collectAllUnit(L.map(() => core.fork(worker(q, pairs, ref)))(L.range_(0, n)))), ({
    pairs
  }) => forEach_(pairs, _ => promise.await(_.get(0)))), Q.shutdown), __trace);
}
/**
 * Applies the functionw `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * Unlike `forEachPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first forEachParN_
 */


function forEachParN(n, f, __trace) {
  return as => forEachParN_(as, n, f, __trace);
}
/**
 * Same as `forEachParN`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @ets_data_first forEachParWithIndexN_
 */


function forEachParWithIndexN(n, f, __trace) {
  return as => forEachParWithIndexN_(as, n, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 */


function forEachExec_(as, es, f, __trace) {
  switch (es._tag) {
    case "Sequential":
      {
        return forEach_(as, f, __trace);
      }

    case "Parallel":
      {
        return forEachPar_(as, f, __trace);
      }

    case "ParallelN":
      {
        return forEachParN_(as, es.n, f, __trace);
      }
  }
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachExec_
 */


function forEachExec(es, f, __trace) {
  return as => forEachExec_(as, es, f, __trace);
}
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */


function collectAll(as, __trace) {
  return forEach_(as, _index4.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */


function collectAllPar(as, __trace) {
  return forEachPar_(as, _index4.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllParN_
 */


function collectAllParN(n, __trace) {
  return as => forEachParN_(as, n, _index4.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 */


function collectAllParN_(as, n, __trace) {
  return forEachParN_(as, n, _index4.identity, __trace);
}
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */


function collectAllUnit(as, __trace) {
  return forEachUnit_(as, _index4.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */


function collectAllUnitPar(as, __trace) {
  return forEachUnitPar_(as, _index4.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllUnitParN_
 */


function collectAllUnitParN(n, __trace) {
  return as => forEachUnitParN_(as, n, _index4.identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 */


function collectAllUnitParN_(as, n, __trace) {
  return forEachUnitParN_(as, n, _index4.identity, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */


function collectAllWith_(as, pf, __trace) {
  return map.map_(collectAll(as, __trace), ChunkCollect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */


function collectAllWith(pf, __trace) {
  return as => collectAllWith_(as, pf, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */


function collectAllWithPar_(as, pf, __trace) {
  return map.map_(collectAllPar(as, __trace), ChunkCollect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */


function collectAllWithPar(pf, __trace) {
  return as => collectAllWithPar_(as, pf, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 */


function collectAllWithParN_(as, n, pf, __trace) {
  return map.map_(collectAllParN_(as, n, __trace), ChunkCollect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllWithParN_
 */


function collectAllWithParN(n, pf, __trace) {
  return as => collectAllWithParN_(as, n, pf, __trace);
}
/**
 * Evaluate and run each effect in the structure and collect discarding failed ones.
 */


function collectAllSuccesses(as, __trace) {
  return collectAllWith_(I.map_(as, x => core.result(x)), e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 */


function collectAllSuccessesPar(as, __trace) {
  return collectAllWithPar_(I.map_(as, x => core.result(x)), e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 */


function collectAllSuccessesParN_(as, n, __trace) {
  return collectAllWithParN_(I.map_(as, x => core.result(x)), n, e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllSuccessesParN_
 */


function collectAllSuccessesParN(n, __trace) {
  return as => collectAllSuccessesParN_(as, n, __trace);
}
/**
 * Joins all fibers, awaiting their _successful_ completion.
 * Attempting to join a fiber that has erred will result in
 * a catchable error, _if_ that error does not result from interruption.
 */


function fiberJoinAll(as, __trace) {
  return tap.tap_(core.chain_(fiberWaitAll(as), _done.done), () => forEach_(as, f => f.inheritRefs), __trace);
}
/**
 * Awaits on all fibers to be completed, successfully or not.
 */


function fiberWaitAll(as, __trace) {
  return core.result(forEachPar_(as, f => core.chain_(f.await, _done.done)), __trace);
}
/**
 * Releases all the finalizers in the releaseMap according to the ExecutionStrategy
 */


function releaseMapReleaseAll(exit, execStrategy, __trace) {
  return _ => flatten.flatten(Ref.modify_(_.ref, s => {
    switch (s._tag) {
      case "Exited":
        {
          return Tp.tuple(core.unit, s);
        }

      case "Running":
        {
          switch (execStrategy._tag) {
            case "Sequential":
              {
                return Tp.tuple(core.chain_(forEach_(Array.from(s.finalizers()).reverse(), ([_, f]) => core.result(f(exit)), __trace), e => (0, _done.done)(O.getOrElse_(Ex.collectAll(...e), () => Ex.succeed([])))), new _Exited.Exited(s.nextKey, exit));
              }

            case "Parallel":
              {
                return Tp.tuple(core.chain_(forEachPar_(Array.from(s.finalizers()).reverse(), ([_, f]) => core.result(f(exit)), __trace), e => (0, _done.done)(O.getOrElse_(Ex.collectAllPar(...e), () => Ex.succeed([])))), new _Exited.Exited(s.nextKey, exit));
              }

            case "ParallelN":
              {
                return Tp.tuple(core.chain_(forEachParN_(Array.from(s.finalizers()).reverse(), execStrategy.n, ([_, f]) => core.result(f(exit)), __trace), e => (0, _done.done)(O.getOrElse_(Ex.collectAllPar(...e), () => Ex.succeed([])))), new _Exited.Exited(s.nextKey, exit));
              }
          }
        }
    }
  }));
}
/**
 * Creates a `Managed` value that acquires the original resource in a fiber,
 * and provides that fiber. The finalizer for this value will interrupt the fiber
 * and run the original finalizer.
 */


function managedFork(self, __trace) {
  return (0, _managed.managedApply)(interruption.uninterruptibleMask(({
    restore
  }) => map.map_(Do.bind_(Do.bind_(Do.bind_(Do.let_(Do.let_(Do.bind_(Do.do, "tp", () => (0, _environment.environment)()), "r", ({
    tp
  }) => tp.get(0)), "outerReleaseMap", ({
    tp
  }) => tp.get(1)), "innerReleaseMap", () => _makeReleaseMap.makeReleaseMap), "fiber", ({
    innerReleaseMap,
    r
  }) => restore(core.provideAll_(coreScope.forkDaemon(map.map_(self.effect, _ => _.get(1))), Tp.tuple(r, innerReleaseMap), __trace))), "releaseMapEntry", ({
    fiber,
    innerReleaseMap,
    outerReleaseMap
  }) => (0, _add.add)(e => core.chain_((0, _interrupt.interrupt)(fiber), () => releaseMapReleaseAll(e, _ExecutionStrategy.sequential)(innerReleaseMap), __trace))(outerReleaseMap)), ({
    fiber,
    releaseMapEntry
  }) => Tp.tuple(releaseMapEntry, fiber))));
}
/**
 * Run an effect while acquiring the resource before and releasing it after
 */


function managedUse_(self, f, __trace) {
  return (0, _bracketExit.bracketExit_)(_makeReleaseMap.makeReleaseMap, rm => core.chain_((0, _provideSome.provideSome_)(self.effect, r => Tp.tuple(r, rm)), a => f(a.get(1)), __trace), (rm, ex) => releaseMapReleaseAll(ex, _ExecutionStrategy.sequential, __trace)(rm));
}

class BackPressureStrategy {
  constructor() {
    this.putters = new _index8.Unbounded();
  }

  handleSurplus(as, queue, takers, isShutdown) {
    return core.suspend((_, fiberId) => {
      const p = promise.unsafeMake(fiberId);
      return interruption.onInterrupt_(core.suspend(() => {
        this.unsafeOffer(as, p);
        this.unsafeOnQueueEmptySpace(queue, takers);
        Q.unsafeCompleteTakers(this, queue, takers);

        if (isShutdown.get) {
          return interruption.interrupt;
        } else {
          return promise.await(p);
        }
      }), () => core.succeedWith(() => this.unsafeRemove(p)));
    });
  }

  unsafeRemove(p) {
    Q.unsafeOfferAll(this.putters, ChunkFilter.filter_(Q.unsafePollAll(this.putters), ([_, __]) => __ !== p));
  }

  unsafeOffer(as, p) {
    let bs = as;

    while (Chunk.size(bs) > 0) {
      const head = Chunk.unsafeGet_(bs, 0);
      bs = Chunk.drop_(bs, 1);

      if (Chunk.size(bs) === 0) {
        this.putters.offer(Tp.tuple(head, p, true));
        return;
      } else {
        this.putters.offer(Tp.tuple(head, p, false));
      }
    }
  }

  unsafeOnQueueEmptySpace(queue, takers) {
    let keepPolling = true;

    while (keepPolling && !queue.isFull) {
      const putter = this.putters.poll(_index8.EmptyQueue);

      if (putter !== _index8.EmptyQueue) {
        const offered = queue.offer(putter.get(0));

        if (offered && putter.get(2)) {
          Q.unsafeCompletePromise(putter.get(1), true);
        } else if (!offered) {
          Q.unsafeOfferAll(this.putters, Chunk.prepend_(Q.unsafePollAll(this.putters), putter));
        }

        Q.unsafeCompleteTakers(this, queue, takers);
      } else {
        keepPolling = false;
      }
    }
  }

  get shutdown() {
    return asUnit.asUnit(tap.tap_(Do.bind_(Do.bind_(Do.do, "fiberId", () => fiberId.fiberId), "putters", () => core.succeedWith(() => Q.unsafePollAll(this.putters))), s => forEachPar_(s.putters, ({
      tuple: [_, p, lastItem]
    }) => lastItem ? promise.interruptAs(s.fiberId)(p) : core.unit)));
  }

  get surplusSize() {
    return this.putters.size;
  }

}
/**
 * Creates a bounded queue
 */


exports.BackPressureStrategy = BackPressureStrategy;

function makeBoundedQueue(capacity, __trace) {
  return core.chain_(core.succeedWith(() => new _index8.Bounded(capacity)), x => createQueue_(x, new BackPressureStrategy()), __trace);
}
/**
 * Unsafely creates a queue
 */


function unsafeCreateQueue(queue, takers, shutdownHook, shutdownFlag, strategy) {
  return new UnsafeCreate(queue, takers, shutdownHook, shutdownFlag, strategy);
}

class UnsafeCreate extends _xqueue.XQueueInternal {
  constructor(queue, takers, shutdownHook, shutdownFlag, strategy) {
    super();
    this.queue = queue;
    this.takers = takers;
    this.shutdownHook = shutdownHook;
    this.shutdownFlag = shutdownFlag;
    this.strategy = strategy;
    this.awaitShutdown = promise.await(this.shutdownHook);
    this.capacity = this.queue.capacity;
    this.isShutdown = core.succeedWith(() => this.shutdownFlag.get);
    this.shutdown = interruption.uninterruptible(core.suspend((_, fiberId) => {
      this.shutdownFlag.set(true);
      return whenM.whenM_(core.chain_(forEachPar_(Q.unsafePollAll(this.takers), promise.interruptAs(fiberId)), () => this.strategy.shutdown), promise.succeed(undefined)(this.shutdownHook));
    }));
    this.size = core.suspend(() => {
      if (this.shutdownFlag.get) {
        return interruption.interrupt;
      } else {
        return core.succeed(this.queue.size - this.takers.size + this.strategy.surplusSize);
      }
    });
    this.take = core.suspend((_, fiberId) => {
      if (this.shutdownFlag.get) {
        return interruption.interrupt;
      }

      const item = this.queue.poll(_index8.EmptyQueue);

      if (item !== _index8.EmptyQueue) {
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return core.succeed(item);
      } else {
        const p = promise.unsafeMake(fiberId);
        return interruption.onInterrupt_(core.suspend(() => {
          this.takers.offer(p);
          Q.unsafeCompleteTakers(this.strategy, this.queue, this.takers);

          if (this.shutdownFlag.get) {
            return interruption.interrupt;
          } else {
            return promise.await(p);
          }
        }), () => core.succeedWith(() => Q.unsafeRemove(this.takers, p)));
      }
    });
    this.takeAll = core.suspend(() => {
      if (this.shutdownFlag.get) {
        return interruption.interrupt;
      } else {
        return core.succeedWith(() => {
          const as = Q.unsafePollAll(this.queue);
          this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
          return as;
        });
      }
    });
  }

  offer(a) {
    return core.suspend(() => {
      if (this.shutdownFlag.get) {
        return interruption.interrupt;
      } else {
        const noRemaining = (() => {
          if (this.queue.isEmpty) {
            const taker = this.takers.poll(_index8.EmptyQueue);

            if (taker === _index8.EmptyQueue) {
              return false;
            } else {
              Q.unsafeCompletePromise(taker, a);
              return true;
            }
          } else {
            return false;
          }
        })();

        if (noRemaining) {
          return core.succeed(true);
        }

        const succeeded = this.queue.offer(a);
        Q.unsafeCompleteTakers(this.strategy, this.queue, this.takers);

        if (succeeded) {
          return core.succeed(true);
        } else {
          return this.strategy.handleSurplus(Chunk.single(a), this.queue, this.takers, this.shutdownFlag);
        }
      }
    });
  }

  offerAll(as) {
    const arr = Chunk.from(as);
    return core.suspend(() => {
      if (this.shutdownFlag.get) {
        return interruption.interrupt;
      } else {
        const pTakers = this.queue.isEmpty ? Q.unsafePollN(this.takers, Chunk.size(arr)) : Chunk.empty();
        const {
          tuple: [forTakers, remaining]
        } = ChunkSplitAt.splitAt_(arr, Chunk.size(pTakers));
        ChunkForEach.forEach_(ChunkZip.zip_(pTakers, forTakers), ({
          tuple: [taker, item]
        }) => {
          Q.unsafeCompletePromise(taker, item);
        });

        if (Chunk.size(remaining) === 0) {
          return core.succeed(true);
        }

        const surplus = Q.unsafeOfferAll(this.queue, remaining);
        Q.unsafeCompleteTakers(this.strategy, this.queue, this.takers);

        if (Chunk.size(surplus) === 0) {
          return core.succeed(true);
        } else {
          return this.strategy.handleSurplus(surplus, this.queue, this.takers, this.shutdownFlag);
        }
      }
    });
  }

  takeUpTo(n) {
    return core.suspend(() => {
      if (this.shutdownFlag.get) {
        return interruption.interrupt;
      } else {
        return core.succeedWith(() => {
          const as = Q.unsafePollN(this.queue, n);
          this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
          return as;
        });
      }
    });
  }

}
/**
 * Creates a queue
 */


function createQueue_(queue, strategy, __trace) {
  return map.map_(promise.make(), p => unsafeCreateQueue(queue, new _index8.Unbounded(), p, new _index7.AtomicBoolean(false), strategy), __trace);
}
/**
 * Creates a queue
 *
 * @ets_data_first createQueue_
 */


function createQueue(strategy, __trace) {
  return queue => createQueue_(queue, strategy, __trace);
}
//# sourceMappingURL=excl-forEach.js.map