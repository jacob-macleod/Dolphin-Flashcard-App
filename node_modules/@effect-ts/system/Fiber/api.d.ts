import * as Cause from "../Cause/core.js";
import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import * as E from "../Either/index.js";
import * as Exit from "../Exit/api.js";
import type { Managed } from "../Managed/managed.js";
import * as T from "./_internal/effect-api.js";
import * as Fiber from "./core.js";
/**
 * Lifts an IO into a `Fiber`.
 */
export declare function fromEffect<E, A>(effect: T.IO<E, A>): T.UIO<Fiber.Fiber<E, A>>;
/**
 * Interrupts all fibers as by the specified fiber, awaiting their interruption.
 */
export declare function interruptAllAs(id: Fiber.FiberID): (fs: Iterable<Fiber.Fiber<any, any>>) => T.UIO<void>;
/**
 * Interrupts all fibers, awaiting their interruption.
 */
export declare function interruptAll(fs: Iterable<Fiber.Fiber<any, any>>): T.Effect<unknown, never, void>;
/**
 * Interrupts the fiber from whichever fiber is calling this method. The
 * interruption will happen in a separate daemon fiber, and the returned
 * effect will always resume immediately without waiting.
 */
export declare function interruptFork<E, A>(fiber: Fiber.Fiber<E, A>): T.Effect<unknown, never, void>;
/**
 * Effectually maps over the value the fiber computes.
 */
export declare function mapM<E2, A, B>(f: (a: A) => T.IO<E2, B>): <E>(fiber: Fiber.Fiber<E, A>) => Fiber.Fiber<E2 | E, B>;
/**
 * Maps over the value the fiber computes.
 */
export declare function map<A, B>(f: (a: A) => B): <E>(fiber: Fiber.Fiber<E, A>) => Fiber.Fiber<E, B>;
/**
 * Joins all fibers, awaiting their _successful_ completion.
 * Attempting to join a fiber that has erred will result in
 * a catchable error, _if_ that error does not result from interruption.
 */
export declare function joinAll<E, A>(as: Iterable<Fiber.Fiber<E, A>>): T.Effect<unknown, E, Chunk.Chunk<A>>;
/**
 * Awaits on all fibers to be completed, successfully or not.
 */
export declare function waitAll<E, A>(as: Iterable<Fiber.Fiber<E, A>>): T.Effect<unknown, never, Exit.Exit<E, Chunk.Chunk<A>>>;
/**
 * Maps over the value the fiber computes.
 */
export declare function map_<E, A, B>(fiber: Fiber.Fiber<E, A>, f: (a: A) => B): Fiber.Fiber<E, B>;
/**
 * Passes the success of this fiber to the specified callback, and continues
 * with the fiber that it returns.
 */
export declare function mapFiber<A, E2, A2>(f: (a: A) => Fiber.Fiber<E2, A2>): <E>(fiber: Fiber.Fiber<E, A>) => T.UIO<Fiber.Fiber<E2 | E, A2>>;
/**
 * Passes the success of this fiber to the specified callback, and continues
 * with the fiber that it returns.
 */
export declare function mapFiber_<A, E, E2, A2>(fiber: Fiber.Fiber<E, A>, f: (a: A) => Fiber.Fiber<E2, A2>): T.UIO<Fiber.Fiber<E | E2, A2>>;
/**
 * Returns a fiber that prefers `this` fiber, but falls back to the
 * `that` one when `this` one fails. Interrupting the returned fiber
 * will interrupt both fibers, sequentially, from left to right.
 */
export declare function orElse<E1, A1>(that: Fiber.Fiber<E1, A1>): <E, A>(fiber: Fiber.Fiber<E, A>) => Fiber.Fiber<E1 | E, A1 | A>;
/**
 * Returns a fiber that prefers `this` fiber, but falls back to the
 * `that` one when `this` one fails. Interrupting the returned fiber
 * will interrupt both fibers, sequentially, from left to right.
 */
export declare function orElseEither<E1, A1>(that: Fiber.Fiber<E1, A1>): <E, A>(fiber: Fiber.Fiber<E, A>) => Fiber.Fiber<E1 | E, E.Either<A, A1>>;
/**
 * Maps the output of this fiber to the specified constant.
 */
export declare function as<B>(b: B): <E, A>(fiber: Fiber.Fiber<E, A>) => Fiber.Fiber<E, B>;
/**
 * Maps the output of this fiber to `void`.
 */
export declare function asUnit<E, A>(fiber: Fiber.Fiber<E, A>): Fiber.Fiber<E, void>;
/**
 * Zips this fiber with the specified fiber, combining their results using
 * the specified combiner function. Both joins and interruptions are performed
 * in sequential order from left to right.
 */
export declare function zipWith_<E, A, E1, A1, B>(fiberA: Fiber.Fiber<E, A>, fiberB: Fiber.Fiber<E1, A1>, f: (a: A, b: A1) => B): Fiber.Fiber<E | E1, B>;
/**
 * Zips this fiber and the specified fiber together, producing a tuple of their output.
 */
export declare function zip_<E, A, E1, A1>(fiberA: Fiber.Fiber<E, A>, fiberB: Fiber.Fiber<E1, A1>): Fiber.Fiber<E | E1, [A, A1]>;
/**
 * Same as `zip` but discards the output of the left hand side.
 */
export declare function zipRight_<E, A, E1, A1>(fiberA: Fiber.Fiber<E, A>, fiberB: Fiber.Fiber<E1, A1>): Fiber.Fiber<E | E1, A1>;
/**
 * Same as `zip` but discards the output of the right hand side.
 */
export declare function zipLeft_<E, A, E1, A1>(fiberA: Fiber.Fiber<E, A>, fiberB: Fiber.Fiber<E1, A1>): Fiber.Fiber<E | E1, A>;
/**
 * Collects all fibers into a single fiber producing an in-order list of the
 * results.
 */
export declare function collectAll<E, A>(fibers: Iterable<Fiber.Fiber<E, A>>): Fiber.Fiber<E, Chunk.Chunk<A>>;
/**
 * @ets_optimize identity
 */
export declare function makeSynthetic<E, A>(_: Omit<Fiber.Synthetic<E, A>, "_tag" | symbol>): Fiber.Fiber<E, A>;
/**
 * Folds over the runtime or synthetic fiber.
 */
export declare function fold<E, A, Z>(runtime: (_: Fiber.Runtime<E, A>) => Z, syntetic: (_: Fiber.Synthetic<E, A>) => Z): (fiber: Fiber.Fiber<E, A>) => Z;
/**
 * A fiber that is done with the specified `Exit` value.
 */
export declare function done<E, A>(exit: Exit.Exit<E, A>): Fiber.Fiber<E, A>;
/**
 * Returns a fiber that has already succeeded with the specified value.
 */
export declare function succeed<A>(a: A): Fiber.Fiber<never, A>;
/**
 * A fiber that has already failed with the specified value.
 */
export declare function fail<E>(e: E): Fiber.Fiber<E, never>;
/**
 * Creates a `Fiber` that is halted with the specified cause.
 */
export declare function halt<E>(cause: Cause.Cause<E>): Fiber.Fiber<E, never>;
/**
 * A fiber that is already interrupted.
 */
export declare function interruptAs(id: Fiber.FiberID): Fiber.Fiber<never, never>;
export declare function toManaged<E, A>(fiber: Fiber.Fiber<E, A>): Managed<unknown, never, Fiber.Fiber<E, A>>;
/**
 * A fiber that never fails or succeeds.
 */
export declare const never: Fiber.Fiber<never, never>;
/**
 * A fiber that has already succeeded with unit.
 */
export declare const unit: Fiber.Fiber<never, void>;
/**
 * Awaits the fiber, which suspends the awaiting fiber until the result of the fiber has been determined.
 */
declare function wait<E, A>(fiber: Fiber.Fiber<E, A>): T.UIO<Exit.Exit<E, A>>;
export { wait as await };
//# sourceMappingURL=api.d.ts.map