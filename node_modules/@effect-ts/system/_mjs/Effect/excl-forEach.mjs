// ets_tracing: off
import * as cause from "../Cause/index.mjs";
import * as ChunkCollect from "../Collections/Immutable/Chunk/api/collect.mjs";
import * as ChunkFilter from "../Collections/Immutable/Chunk/api/filter.mjs";
import * as ChunkForEach from "../Collections/Immutable/Chunk/api/forEach.mjs";
import * as ChunkIndexWhere from "../Collections/Immutable/Chunk/api/indexWhere.mjs";
import * as ChunkSplitAt from "../Collections/Immutable/Chunk/api/splitAt.mjs";
import * as ChunkZip from "../Collections/Immutable/Chunk/api/zip.mjs";
import * as Chunk from "../Collections/Immutable/Chunk/core.mjs";
import * as L from "../Collections/Immutable/List/core.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as Ex from "../Exit/index.mjs";
import { interrupt as fiberInterrupt } from "../Fiber/interrupt.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as I from "../Iterable/index.mjs";
import { managedApply } from "../Managed/managed.mjs";
import { add } from "../Managed/ReleaseMap/add.mjs";
import { Exited } from "../Managed/ReleaseMap/Exited.mjs";
import { makeReleaseMap } from "../Managed/ReleaseMap/makeReleaseMap.mjs";
import * as O from "../Option/index.mjs";
import * as Q from "../Queue/core.mjs";
import { XQueueInternal } from "../Queue/xqueue.mjs";
import { AtomicBoolean } from "../Support/AtomicBoolean/index.mjs";
import { Bounded, EmptyQueue, Unbounded } from "../Support/MutableQueue/index.mjs";
import * as asUnit from "./asUnit.mjs";
import * as bracket from "./bracket.mjs";
import { bracketExit_ } from "./bracketExit.mjs";
import * as catchAll from "./catchAll.mjs";
import * as core from "./core.mjs";
import * as coreScope from "./core-scope.mjs";
import * as Do from "./do.mjs";
import { done } from "./done.mjs";
import * as ensuring from "./ensuring.mjs";
import { environment } from "./environment.mjs";
import * as Ref from "./excl-deps-ref.mjs";
import * as promise from "./excl-forEach-promise.mjs";
import { sequential } from "./ExecutionStrategy.mjs";
import * as fiberId from "./fiberId.mjs";
import * as flatten from "./flatten.mjs";
import * as ifM from "./ifM.mjs";
import * as interruption from "./interruption.mjs";
import * as map from "./map.mjs";
import { provideSome_ } from "./provideSome.mjs";
import * as tap from "./tap.mjs";
import * as tapCause from "./tapCause.mjs";
import { toManaged } from "./toManaged.mjs";
import * as whenM from "./whenM.mjs";
import * as zips from "./zips.mjs";
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 */

export function forEach_(as, f, __trace) {
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

export function forEachWithIndex_(as, f, __trace) {
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

export function forEach(f, __trace) {
  return as => forEach_(as, f, __trace);
}
/**
 * Same as `forEach`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @ets_data_first forEachWithIndex_
 */

export function forEachWithIndex(f, __trace) {
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


export function forEachUnit_(as, f, __trace) {
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

export function forEachUnit(f, __trace) {
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

export function forEachUnitPar_(as, f, __trace) {
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

export function forkManaged(self, __trace) {
  return managedFork(toManaged(self), __trace);
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

export function forEachUnitPar(f, __trace) {
  return as => forEachUnitPar_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 */

export function forEachPar_(as, f, __trace) {
  return core.suspend(() => core.chain_(core.succeedWith(() => []), array => map.map_(forEachUnitPar_(I.map_(as, (a, n) => [a, n]), ([a, n]) => core.chain_(core.suspend(() => f(a)), b => core.succeedWith(() => {
    array[n] = b;
  }))), () => Chunk.from(array))), __trace);
}
/**
 * Same as `forEachPar_`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */

export function forEachParWithIndex_(as, f, __trace) {
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

export function forEachPar(f, __trace) {
  return as => forEachPar_(as, f, __trace);
}
/**
 * Same as `forEachPar`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */

export function forEachParWithIndex(f, __trace) {
  return as => forEachParWithIndex_(as, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * Unlike `forEachUnitPar_`, this method will use at most up to `n` fibers.
 */

export function forEachUnitParN_(as, n, f, __trace) {
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

export function forEachUnitParN(n, f, __trace) {
  return as => forEachUnitParN_(as, n, f, __trace);
}
/**
 * Applies the functionw `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * Unlike `forEachPar`, this method will use at most up to `n` fibers.
 */

export function forEachParN_(as, n, f, __trace) {
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

export function forEachParWithIndexN_(as, n, f, __trace) {
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

export function forEachParN(n, f, __trace) {
  return as => forEachParN_(as, n, f, __trace);
}
/**
 * Same as `forEachParN`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @ets_data_first forEachParWithIndexN_
 */

export function forEachParWithIndexN(n, f, __trace) {
  return as => forEachParWithIndexN_(as, n, f, __trace);
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 */

export function forEachExec_(as, es, f, __trace) {
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

export function forEachExec(es, f, __trace) {
  return as => forEachExec_(as, es, f, __trace);
}
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */

export function collectAll(as, __trace) {
  return forEach_(as, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */

export function collectAllPar(as, __trace) {
  return forEachPar_(as, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllParN_
 */

export function collectAllParN(n, __trace) {
  return as => forEachParN_(as, n, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 */

export function collectAllParN_(as, n, __trace) {
  return forEachParN_(as, n, identity, __trace);
}
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */

export function collectAllUnit(as, __trace) {
  return forEachUnit_(as, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */

export function collectAllUnitPar(as, __trace) {
  return forEachUnitPar_(as, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllUnitParN_
 */

export function collectAllUnitParN(n, __trace) {
  return as => forEachUnitParN_(as, n, identity, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 */

export function collectAllUnitParN_(as, n, __trace) {
  return forEachUnitParN_(as, n, identity, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */

export function collectAllWith_(as, pf, __trace) {
  return map.map_(collectAll(as, __trace), ChunkCollect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */

export function collectAllWith(pf, __trace) {
  return as => collectAllWith_(as, pf, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */

export function collectAllWithPar_(as, pf, __trace) {
  return map.map_(collectAllPar(as, __trace), ChunkCollect.collect(pf));
}
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */

export function collectAllWithPar(pf, __trace) {
  return as => collectAllWithPar_(as, pf, __trace);
}
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 */

export function collectAllWithParN_(as, n, pf, __trace) {
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

export function collectAllWithParN(n, pf, __trace) {
  return as => collectAllWithParN_(as, n, pf, __trace);
}
/**
 * Evaluate and run each effect in the structure and collect discarding failed ones.
 */

export function collectAllSuccesses(as, __trace) {
  return collectAllWith_(I.map_(as, x => core.result(x)), e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 */

export function collectAllSuccessesPar(as, __trace) {
  return collectAllWithPar_(I.map_(as, x => core.result(x)), e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 */

export function collectAllSuccessesParN_(as, n, __trace) {
  return collectAllWithParN_(I.map_(as, x => core.result(x)), n, e => e._tag === "Success" ? O.some(e.value) : O.none, __trace);
}
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllSuccessesParN_
 */

export function collectAllSuccessesParN(n, __trace) {
  return as => collectAllSuccessesParN_(as, n, __trace);
}
/**
 * Joins all fibers, awaiting their _successful_ completion.
 * Attempting to join a fiber that has erred will result in
 * a catchable error, _if_ that error does not result from interruption.
 */

export function fiberJoinAll(as, __trace) {
  return tap.tap_(core.chain_(fiberWaitAll(as), done), () => forEach_(as, f => f.inheritRefs), __trace);
}
/**
 * Awaits on all fibers to be completed, successfully or not.
 */

export function fiberWaitAll(as, __trace) {
  return core.result(forEachPar_(as, f => core.chain_(f.await, done)), __trace);
}
/**
 * Releases all the finalizers in the releaseMap according to the ExecutionStrategy
 */

export function releaseMapReleaseAll(exit, execStrategy, __trace) {
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
                return Tp.tuple(core.chain_(forEach_(Array.from(s.finalizers()).reverse(), ([_, f]) => core.result(f(exit)), __trace), e => done(O.getOrElse_(Ex.collectAll(...e), () => Ex.succeed([])))), new Exited(s.nextKey, exit));
              }

            case "Parallel":
              {
                return Tp.tuple(core.chain_(forEachPar_(Array.from(s.finalizers()).reverse(), ([_, f]) => core.result(f(exit)), __trace), e => done(O.getOrElse_(Ex.collectAllPar(...e), () => Ex.succeed([])))), new Exited(s.nextKey, exit));
              }

            case "ParallelN":
              {
                return Tp.tuple(core.chain_(forEachParN_(Array.from(s.finalizers()).reverse(), execStrategy.n, ([_, f]) => core.result(f(exit)), __trace), e => done(O.getOrElse_(Ex.collectAllPar(...e), () => Ex.succeed([])))), new Exited(s.nextKey, exit));
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

export function managedFork(self, __trace) {
  return managedApply(interruption.uninterruptibleMask(({
    restore
  }) => map.map_(Do.bind_(Do.bind_(Do.bind_(Do.let_(Do.let_(Do.bind_(Do.do, "tp", () => environment()), "r", ({
    tp
  }) => tp.get(0)), "outerReleaseMap", ({
    tp
  }) => tp.get(1)), "innerReleaseMap", () => makeReleaseMap), "fiber", ({
    innerReleaseMap,
    r
  }) => restore(core.provideAll_(coreScope.forkDaemon(map.map_(self.effect, _ => _.get(1))), Tp.tuple(r, innerReleaseMap), __trace))), "releaseMapEntry", ({
    fiber,
    innerReleaseMap,
    outerReleaseMap
  }) => add(e => core.chain_(fiberInterrupt(fiber), () => releaseMapReleaseAll(e, sequential)(innerReleaseMap), __trace))(outerReleaseMap)), ({
    fiber,
    releaseMapEntry
  }) => Tp.tuple(releaseMapEntry, fiber))));
}
/**
 * Run an effect while acquiring the resource before and releasing it after
 */

export function managedUse_(self, f, __trace) {
  return bracketExit_(makeReleaseMap, rm => core.chain_(provideSome_(self.effect, r => Tp.tuple(r, rm)), a => f(a.get(1)), __trace), (rm, ex) => releaseMapReleaseAll(ex, sequential, __trace)(rm));
}
export class BackPressureStrategy {
  constructor() {
    this.putters = new Unbounded();
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
      const putter = this.putters.poll(EmptyQueue);

      if (putter !== EmptyQueue) {
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

export function makeBoundedQueue(capacity, __trace) {
  return core.chain_(core.succeedWith(() => new Bounded(capacity)), x => createQueue_(x, new BackPressureStrategy()), __trace);
}
/**
 * Unsafely creates a queue
 */

export function unsafeCreateQueue(queue, takers, shutdownHook, shutdownFlag, strategy) {
  return new UnsafeCreate(queue, takers, shutdownHook, shutdownFlag, strategy);
}

class UnsafeCreate extends XQueueInternal {
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

      const item = this.queue.poll(EmptyQueue);

      if (item !== EmptyQueue) {
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
            const taker = this.takers.poll(EmptyQueue);

            if (taker === EmptyQueue) {
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


export function createQueue_(queue, strategy, __trace) {
  return map.map_(promise.make(), p => unsafeCreateQueue(queue, new Unbounded(), p, new AtomicBoolean(false), strategy), __trace);
}
/**
 * Creates a queue
 *
 * @ets_data_first createQueue_
 */

export function createQueue(strategy, __trace) {
  return queue => createQueue_(queue, strategy, __trace);
}
//# sourceMappingURL=excl-forEach.mjs.map