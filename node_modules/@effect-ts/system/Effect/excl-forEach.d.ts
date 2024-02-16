import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import type { Exit } from "../Exit/index.js";
import type { FiberContext } from "../Fiber/context.js";
import type * as Fiber from "../Fiber/core.js";
import type { Managed } from "../Managed/managed.js";
import type { ReleaseMap } from "../Managed/ReleaseMap/index.js";
import * as O from "../Option/index.js";
import type { Promise } from "../Promise/index.js";
import * as Q from "../Queue/core.js";
import { AtomicBoolean } from "../Support/AtomicBoolean/index.js";
import type { MutableQueue } from "../Support/MutableQueue/index.js";
import type { Effect, UIO } from "./effect.js";
import type { ExecutionStrategy } from "./ExecutionStrategy.js";
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 */
export declare function forEach_<A, R, E, B>(as: Iterable<A>, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Same as `forEach_`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */
export declare function forEachWithIndex_<A, R, E, B>(as: Iterable<A>, f: (a: A, i: number) => Effect<R, E, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns the results in a new `readonly B[]`.
 *
 * For a parallel version of this method, see `forEachPar`.
 * If you do not need the results, see `forEachUnit` for a more efficient implementation.
 *
 * @ets_data_first forEach_
 */
export declare function forEach<A, R, E, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Same as `forEach`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @ets_data_first forEachWithIndex_
 */
export declare function forEachWithIndex<A, R, E, B>(f: (a: A, i: number) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 */
export declare function forEachUnit_<R, E, A, X>(as: Iterable<A>, f: (a: A) => Effect<R, E, X>, __trace?: string): Effect<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` and runs
 * produced effects sequentially.
 *
 * Equivalent to `asUnit(forEach(as, f))`, but without the cost of building
 * the list of results.
 *
 * @ets_data_first forEachUnit_
 */
export declare function forEachUnit<R, E, A, X>(f: (a: A) => Effect<R, E, X>, __trace?: string): (as: Iterable<A>) => Effect<R, E, void>;
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
export declare function forEachUnitPar_<R, E, A, X>(as: Iterable<A>, f: (a: A) => Effect<R, E, X>, __trace?: string): Effect<R, E, void>;
/**
 * Forks the fiber in a `Managed`. Using the `Managed` value will
 * execute the effect in the fiber, while ensuring its interruption when
 * the effect supplied to `use` completes.
 */
export declare function forkManaged<R, E, A>(self: Effect<R, E, A>, __trace?: string): Managed<R, never, FiberContext<E, A>>;
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
export declare function forEachUnitPar<R, E, A, X>(f: (a: A) => Effect<R, E, X>, __trace?: string): (as: Iterable<A>) => Effect<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 */
export declare function forEachPar_<R, E, A, B>(as: Iterable<A>, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Same as `forEachPar_`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */
export declare function forEachParWithIndex_<R, E, A, B>(as: Iterable<A>, f: (a: A, i: number) => Effect<R, E, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachPar_
 */
export declare function forEachPar<R, E, A, B>(f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Same as `forEachPar`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */
export declare function forEachParWithIndex<R, E, A, B>(f: (a: A, i: number) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * Unlike `forEachUnitPar_`, this method will use at most up to `n` fibers.
 */
export declare function forEachUnitParN_<R, E, A, X>(as: Iterable<A>, n: number, f: (a: A) => Effect<R, E, X>, __trace?: string): Effect<R, E, void>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` and runs
 * produced effects in parallel, discarding the results.
 *
 * Unlike `forEachUnitPar_`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first forEachUnitParN_
 */
export declare function forEachUnitParN<R, E, A, X>(n: number, f: (a: A) => Effect<R, E, X>, __trace?: string): (as: Iterable<A>) => Effect<R, E, void>;
/**
 * Applies the functionw `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * Unlike `forEachPar`, this method will use at most up to `n` fibers.
 */
export declare function forEachParN_<R, E, A, B>(as: Iterable<A>, n: number, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Same as `forEachParN_`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 */
export declare function forEachParWithIndexN_<R, E, A, B>(as: Iterable<A>, n: number, f: (a: A, i: number) => Effect<R, E, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Applies the functionw `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * Unlike `forEachPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first forEachParN_
 */
export declare function forEachParN<R, E, A, B>(n: number, f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Same as `forEachParN`, except that the function `f` is supplied
 * a second argument that corresponds to the index (starting from 0)
 * of the current element being iterated over.
 *
 * @ets_data_first forEachParWithIndexN_
 */
export declare function forEachParWithIndexN<R, E, A, B>(n: number, f: (a: A, i: number) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 */
export declare function forEachExec_<R, E, A, B>(as: Iterable<A>, es: ExecutionStrategy, f: (a: A) => Effect<R, E, B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Applies the function `f` to each element of the `Iterable<A>` in parallel,
 * and returns the results in a new `readonly B[]`.
 *
 * For a sequential version of this method, see `forEach`.
 *
 * @ets_data_first forEachExec_
 */
export declare function forEachExec<R, E, A, B>(es: ExecutionStrategy, f: (a: A) => Effect<R, E, B>, __trace?: string): (as: Iterable<A>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure from left to right, and collect the
 * results. For a parallel version, see `collectAllPar`.
 */
export declare function collectAll<R, E, A>(as: Iterable<Effect<R, E, A>>, __trace?: string): Effect<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 */
export declare function collectAllPar<R, E, A>(as: Iterable<Effect<R, E, A>>, __trace?: string): Effect<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllParN_
 */
export declare function collectAllParN(n: number, __trace?: string): <R, E, A>(as: Iterable<Effect<R, E, A>>) => Effect<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure in parallel, and collect the
 * results. For a sequential version, see `collectAll`.
 *
 * Unlike `collectAllPar`, this method will use at most `n` fibers.
 */
export declare function collectAllParN_<R, E, A>(as: Iterable<Effect<R, E, A>>, n: number, __trace?: string): Effect<R, E, Chunk.Chunk<A>>;
/**
 * Evaluate each effect in the structure from left to right, and discard the
 * results. For a parallel version, see `collectAllUnitPar`.
 */
export declare function collectAllUnit<R, E, A>(as: Iterable<Effect<R, E, A>>, __trace?: string): Effect<R, E, void>;
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 */
export declare function collectAllUnitPar<R, E, A>(as: Iterable<Effect<R, E, A>>, __trace?: string): Effect<R, E, void>;
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 *
 * @ets_data_first collectAllUnitParN_
 */
export declare function collectAllUnitParN(n: number, __trace?: string): <R, E, A>(as: Iterable<Effect<R, E, A>>) => Effect<R, E, void>;
/**
 * Evaluate each effect in the structure in parallel, and discard the
 * results. For a sequential version, see `collectAllUnit`.
 *
 * Unlike `collectAllUnitPar`, this method will use at most `n` fibers.
 */
export declare function collectAllUnitParN_<R, E, A>(as: Iterable<Effect<R, E, A>>, n: number, __trace?: string): Effect<R, E, void>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */
export declare function collectAllWith_<R, E, A, B>(as: Iterable<Effect<R, E, A>>, pf: (a: A) => O.Option<B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWith_
 */
export declare function collectAllWith<A, B>(pf: (a: A) => O.Option<B>, __trace?: string): <R, E>(as: Iterable<Effect<R, E, A>>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 */
export declare function collectAllWithPar_<R, E, A, B>(as: Iterable<Effect<R, E, A>>, pf: (a: A) => O.Option<B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAll`, and collect
 * the results with given partial function.
 *
 * @ets_data_first collectAllWithPar_
 */
export declare function collectAllWithPar<A, B>(pf: (a: A) => O.Option<B>, __trace?: string): <R, E>(as: Iterable<Effect<R, E, A>>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 */
export declare function collectAllWithParN_<R, E, A, B>(as: Iterable<Effect<R, E, A>>, n: number, pf: (a: A) => O.Option<B>, __trace?: string): Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate each effect in the structure with `collectAllPar`, and collect
 * the results with given partial function.
 *
 * Unlike `collectAllWithPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllWithParN_
 */
export declare function collectAllWithParN<A, B>(n: number, pf: (a: A) => O.Option<B>, __trace?: string): <R, E>(as: Iterable<Effect<R, E, A>>) => Effect<R, E, Chunk.Chunk<B>>;
/**
 * Evaluate and run each effect in the structure and collect discarding failed ones.
 */
export declare function collectAllSuccesses<R, E, A>(as: Iterable<Effect<R, E, A>>, __trace?: string): Effect<R, never, Chunk.Chunk<A>>;
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 */
export declare function collectAllSuccessesPar<R, E, A>(as: Iterable<Effect<R, E, A>>, __trace?: string): Effect<R, never, Chunk.Chunk<A>>;
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 */
export declare function collectAllSuccessesParN_<R, E, A>(as: Iterable<Effect<R, E, A>>, n: number, __trace?: string): Effect<R, never, Chunk.Chunk<A>>;
/**
 * Evaluate and run each effect in the structure in parallel, and collect discarding failed ones.
 *
 * Unlike `collectAllSuccessesPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectAllSuccessesParN_
 */
export declare function collectAllSuccessesParN(n: number, __trace?: string): <R, E, A>(as: Iterable<Effect<R, E, A>>) => Effect<R, never, Chunk.Chunk<A>>;
/**
 * Joins all fibers, awaiting their _successful_ completion.
 * Attempting to join a fiber that has erred will result in
 * a catchable error, _if_ that error does not result from interruption.
 */
export declare function fiberJoinAll<E, A>(as: Iterable<Fiber.Fiber<E, A>>, __trace?: string): Effect<unknown, E, Chunk.Chunk<A>>;
/**
 * Awaits on all fibers to be completed, successfully or not.
 */
export declare function fiberWaitAll<E, A>(as: Iterable<Fiber.Fiber<E, A>>, __trace?: string): Effect<unknown, never, Exit<E, Chunk.Chunk<A>>>;
/**
 * Releases all the finalizers in the releaseMap according to the ExecutionStrategy
 */
export declare function releaseMapReleaseAll(exit: Exit<any, any>, execStrategy: ExecutionStrategy, __trace?: string): (_: ReleaseMap) => UIO<any>;
/**
 * Creates a `Managed` value that acquires the original resource in a fiber,
 * and provides that fiber. The finalizer for this value will interrupt the fiber
 * and run the original finalizer.
 */
export declare function managedFork<R, E, A>(self: Managed<R, E, A>, __trace?: string): Managed<R, never, FiberContext<E, A>>;
/**
 * Run an effect while acquiring the resource before and releasing it after
 */
export declare function managedUse_<R, E, A, R2, E2, B>(self: Managed<R, E, A>, f: (a: A) => Effect<R2, E2, B>, __trace?: string): Effect<R & R2, E | E2, B>;
export declare class BackPressureStrategy<A> implements Q.Strategy<A> {
    private putters;
    handleSurplus(as: Chunk.Chunk<A>, queue: MutableQueue<A>, takers: MutableQueue<Promise<never, A>>, isShutdown: AtomicBoolean): UIO<boolean>;
    unsafeRemove(p: Promise<never, boolean>): void;
    unsafeOffer(as: Chunk.Chunk<A>, p: Promise<never, boolean>): void;
    unsafeOnQueueEmptySpace(queue: MutableQueue<A>, takers: MutableQueue<Promise<never, A>>): void;
    get shutdown(): UIO<void>;
    get surplusSize(): number;
}
/**
 * Creates a bounded queue
 */
export declare function makeBoundedQueue<A>(capacity: number, __trace?: string): UIO<Q.Queue<A>>;
/**
 * Unsafely creates a queue
 */
export declare function unsafeCreateQueue<A>(queue: MutableQueue<A>, takers: MutableQueue<Promise<never, A>>, shutdownHook: Promise<never, void>, shutdownFlag: AtomicBoolean, strategy: Q.Strategy<A>): Q.Queue<A>;
/**
 * Creates a queue
 */
export declare function createQueue_<A>(queue: MutableQueue<A>, strategy: Q.Strategy<A>, __trace?: string): Effect<unknown, never, Q.Queue<A>>;
/**
 * Creates a queue
 *
 * @ets_data_first createQueue_
 */
export declare function createQueue<A>(strategy: Q.Strategy<A>, __trace?: string): (queue: MutableQueue<A>) => Effect<unknown, never, Q.Queue<A>>;
//# sourceMappingURL=excl-forEach.d.ts.map