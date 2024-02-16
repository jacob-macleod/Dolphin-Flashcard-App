import "../../Operator/index.js";
import * as C from "../../Cause/index.js";
import type { HasClock } from "../../Clock/index.js";
import * as A from "../../Collections/Immutable/Chunk/index.js";
import * as List from "../../Collections/Immutable/List/index.js";
import type * as MP from "../../Collections/Immutable/Map/index.js";
import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as E from "../../Either/index.js";
import * as H from "../../Hub/index.js";
import * as L from "../../Layer/index.js";
import * as O from "../../Option/index.js";
import * as Q from "../../Queue/index.js";
import * as T from "../_internal/effect.js";
import * as M from "../_internal/managed.js";
import * as Push from "../Push/index.js";
import type { Transducer } from "../Transducer/index.js";
export declare class Sink<R, E, I, L, Z> {
    readonly push: M.Managed<R, never, Push.Push<R, E, I, L, Z>>;
    constructor(push: M.Managed<R, never, Push.Push<R, E, I, L, Z>>);
}
/**
 * Replaces this sink's result with the provided value.
 */
export declare function as_<R, E, I, L, Z, Z1>(self: Sink<R, E, I, L, Z>, z: Z1): Sink<R, E, I, L, Z1>;
/**
 * Replaces this sink's result with the provided value.
 */
export declare function as<Z1>(z: Z1): <R, E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R, E, I, L, Z1>;
/**
 * Repeatedly runs the sink for as long as its results satisfy
 * the predicate `p`. The sink's results will be accumulated
 * using the stepping function `f`.
 */
export declare function collectAllWhileWith<S>(z: S): <Z>(p: (z: Z) => boolean) => (f: (s: S, z: Z) => S) => <R, E, I, L extends I>(self: Sink<R, E, I, L, Z>) => Sink<R, E, I, L, S>;
/**
 * Transforms this sink's input elements.
 */
export declare function contramap_<R, E, I, I2, L, Z>(self: Sink<R, E, I, L, Z>, f: (i2: I2) => I): Sink<R, E, I2, L, Z>;
/**
 * Transforms this sink's input elements.
 */
export declare function contramap<I, I2>(f: (i2: I2) => I): <R, E, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R, E, I2, L, Z>;
/**
 * Effectfully transforms this sink's input elements.
 */
export declare function contramapM_<R, R1, E, E1, I, I2, L, Z>(self: Sink<R, E, I, L, Z>, f: (i2: I2) => T.Effect<R1, E1, I>): Sink<R & R1, E | E1, I2, L, Z>;
/**
 * Effectfully transforms this sink's input elements.
 */
export declare function contramapM<R1, E1, I, I2>(f: (i2: I2) => T.Effect<R1, E1, I>): <R, E, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I2, L, Z>;
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */
export declare function contramapChunks_<R, E, I, I2, L, Z>(self: Sink<R, E, I, L, Z>, f: (a: A.Chunk<I2>) => A.Chunk<I>): Sink<R, E, I2, L, Z>;
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */
export declare function contramapChunks<I, I2>(f: (a: A.Chunk<I2>) => A.Chunk<I>): <R, E, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R, E, I2, L, Z>;
/**
 * Effectfully transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */
export declare function contramapChunksM_<R, R1, E, E1, I, I2, L, Z>(self: Sink<R, E, I, L, Z>, f: (a: A.Chunk<I2>) => T.Effect<R1, E1, A.Chunk<I>>): Sink<R & R1, E | E1, I2, L, Z>;
/**
 * Effectfully transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */
export declare function contramapChunksM<R1, E1, I, I2>(f: (a: A.Chunk<I2>) => T.Effect<R1, E1, A.Chunk<I>>): <R, E, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I2, L, Z>;
/**
 * Transforms both inputs and result of this sink using the provided functions.
 */
export declare function dimap_<R, E, I, I2, L, Z, Z2>(self: Sink<R, E, I, L, Z>, f: (i2: I2) => I, g: (z: Z) => Z2): Sink<R, E, I2, L, Z2>;
/**
 * Transforms both inputs and result of this sink using the provided functions.
 */
export declare function dimap<I, I2, Z, Z2>(f: (i2: I2) => I, g: (z: Z) => Z2): <R, E, L>(self: Sink<R, E, I, L, Z>) => Sink<R, E, I2, L, Z2>;
/**
 * Effectfully transforms both inputs and result of this sink using the provided functions.
 */
export declare function dimapM_<R, R1, E, E1, I, I2, L, Z, Z2>(self: Sink<R, E, I, L, Z>, f: (i2: I2) => T.Effect<R1, E1, I>, g: (z: Z) => T.Effect<R1, E1, Z2>): Sink<R & R1, E | E1, I2, L, Z2>;
/**
 * Effectfully transforms both inputs and result of this sink using the provided functions.
 */
export declare function dimapM<R1, E1, I, I2, Z, Z2>(f: (i2: I2) => T.Effect<R1, E1, I>, g: (z: Z) => T.Effect<R1, E1, Z2>): <R, E, L>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I2, L, Z2>;
/**
 * Transforms both input chunks and result of this sink using the provided functions.
 */
export declare function dimapChunks_<R, E, I, I2, L, Z, Z2>(self: Sink<R, E, I, L, Z>, f: (i2: A.Chunk<I2>) => A.Chunk<I>, g: (z: Z) => Z2): Sink<R, E, I2, L, Z2>;
/**
 * Transforms both input chunks and result of this sink using the provided functions.
 */
export declare function dimapChunks<I, I2, Z, Z2>(f: (i2: A.Chunk<I2>) => A.Chunk<I>, g: (z: Z) => Z2): <R, E, L>(self: Sink<R, E, I, L, Z>) => Sink<R, E, I2, L, Z2>;
/**
 * Effectfully transforms both input chunks and result of this sink using the provided functions.
 * `f` and `g` must preserve chunking-invariance
 */
export declare function dimapChunksM_<R, R1, E, E1, I, I2, L, Z, Z2>(self: Sink<R, E, I, L, Z>, f: (i2: A.Chunk<I2>) => T.Effect<R1, E1, A.Chunk<I>>, g: (z: Z) => T.Effect<R1, E1, Z2>): Sink<R & R1, E | E1, I2, L, Z2>;
/**
 * Effectfully transforms both input chunks and result of this sink using the provided functions.
 * `f` and `g` must preserve chunking-invariance
 */
export declare function dimapChunksM<R1, E1, I, I2, Z, Z2>(f: (i2: A.Chunk<I2>) => T.Effect<R1, E1, A.Chunk<I>>, g: (z: Z) => T.Effect<R1, E1, Z2>): <R, E, L>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I2, L, Z2>;
/**
 * Runs this sink until it yields a result, then uses that result to create another
 * sink from the provided function which will continue to run until it yields a result.
 *
 * This function essentially runs sinks in sequence.
 */
export declare function chain_<R, E, I, L extends I1, Z, R1, E1, I1 extends I, L1, Z1>(self: Sink<R, E, I, L, Z>, f: (z: Z) => Sink<R1, E1, I1, L1, Z1>): Sink<R & R1, E | E1, I1, L1, Z1>;
/**
 * Runs this sink until it yields a result, then uses that result to create another
 * sink from the provided function which will continue to run until it yields a result.
 *
 * This function essentially runs sinks in sequence.
 */
export declare function chain<Z, R, R1, E1, I, I1 extends I, L1, Z1>(f: (z: Z) => Sink<R1, E1, I1, L1, Z1>): <E, L extends I1>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I1, L1, Z1>;
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
export declare function foldM_<R, R1, R2, E, E1, E2, I, I1, I2, L, L1, L2, Z, Z1, Z2>(self: Sink<R, E, I, L, Z>, failure: (e: E) => Sink<R1, E1, I1, L1, Z1>, success: (z: Z) => Sink<R2, E2, I2, L2, Z2>): Sink<R & R1 & R2, E1 | E2, I & I1 & I2, L1 | L2, Z1 | Z2>;
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
export declare function foldM<R1, R2, E, E1, E2, I1, I2, L1, L2, Z, Z1, Z2>(failure: (e: E) => Sink<R1, E1, I1, L1, Z1>, success: (z: Z) => Sink<R2, E2, I2, L2, Z2>): <R, I, L>(self: Sink<R, E, I, L, Z>) => Sink<R & R1 & R2, E1 | E2, I & I1 & I2, L1 | L2, Z1 | Z2>;
/**
 * Transforms this sink's result.
 */
export declare function map_<R, E, I, L, Z, Z2>(self: Sink<R, E, I, L, Z>, f: (z: Z) => Z2): Sink<R, E, I, L, Z2>;
/**
 * Transforms this sink's result.
 */
export declare function map<Z, Z2>(f: (z: Z) => Z2): <R, E, I, L>(self: Sink<R, E, I, L, Z>) => Sink<R, E, I, L, Z2>;
/**
 * Transforms the errors emitted by this sink using `f`.
 */
export declare function mapError_<R, E, E2, I, L, Z>(self: Sink<R, E, I, L, Z>, f: (e: E) => E2): Sink<R, E | E2, I, L, Z>;
/**
 * Transforms the errors emitted by this sink using `f`.
 */
export declare function mapError<E, E2>(f: (e: E) => E2): <R, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R, E | E2, I, L, Z>;
/**
 * Effectfully transforms this sink's result.
 */
export declare function mapM_<R, R1, E, E1, I, L, Z, Z2>(self: Sink<R, E, I, L, Z>, f: (z: Z) => T.Effect<R1, E1, Z2>): Sink<R & R1, E | E1, I, L, Z2>;
/**
 * Effectfully transforms this sink's result.
 */
export declare function mapM<R1, E1, Z, Z2>(f: (z: Z) => T.Effect<R1, E1, Z2>): <R, E, I, L>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I, L, Z2>;
/**
 * Runs both sinks in parallel on the input, , returning the result or the error from the
 * one that finishes first.
 */
export declare function race_<R, R1, E, E1, I, I1, L, L1, Z, Z1>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>): Sink<R & R1, E | E1, I & I1, L | L1, Z | Z1>;
/**
 * Runs both sinks in parallel on the input, , returning the result or the error from the
 * one that finishes first.
 */
export declare function race<R1, E1, I1, L1, Z1>(that: Sink<R1, E1, I1, L1, Z1>): <R, E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & I1, L1 | L, Z1 | Z>;
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */
export declare function raceBoth_<R, R1, E, E1, I, I1, L, L1, Z, Z1>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>): Sink<R1 & R, E1 | E, I & I1, L1 | L, E.Either<Z, Z1>>;
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */
export declare function raceBoth<R1, E1, I1, L1, Z1>(that: Sink<R1, E1, I1, L1, Z1>): <R, E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R1 & R, E1 | E, I & I1, L1 | L, E.Either<Z, Z1>>;
/**
 * Returns the sink that executes this one and times its execution.
 */
export declare function timed<R, E, I, L, Z>(self: Sink<R, E, I, L, Z>): Sink<R & HasClock, E, I, L, Tp.Tuple<[Z, number]>>;
/**
 * Converts this sink to a transducer that feeds incoming elements to the sink
 * and emits the sink's results as outputs. The sink will be restarted when
 * it ends.
 */
export declare function toTransducer<R, E, I, L extends I, Z>(self: Sink<R, E, I, L, Z>): Transducer<R, E, I, Z>;
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, combining the two results in a tuple.
 */
export declare function zip_<R, R1, E, E1, I, I1 extends I, L extends I1, L1, Z, Z1>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>): Sink<R & R1, E | E1, I & I1, L | L1, Tp.Tuple<[Z, Z1]>>;
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, combining the two results in a tuple.
 */
export declare function zip<R1, E1, I, I1 extends I, L1, Z1>(that: Sink<R1, E1, I1, L1, Z1>): <R, E, L extends I1, Z>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & I1, L1 | L, Tp.Tuple<[Z, Z1]>>;
/**
 * Like `zip`, but keeps only the result from the `that` sink.
 */
export declare function zipLeft_<R, R1, E, E1, I, I1 extends I, L extends I1, L1, Z, Z1>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>): Sink<R & R1, E | E1, I & L1 & I1, L | L1, Z>;
/**
 * Like `zip`, but keeps only the result from the `that` sink.
 */
export declare function zipLeft<R1, E1, I, I1 extends I, L1, Z1>(that: Sink<R1, E1, I1, L1, Z1>): <R, E, L extends I1, Z>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & L1 & I1, L1 | L, Z>;
/**
 * Runs both sinks in parallel on the input and combines the results in a tuple.
 */
export declare function zipPar_<R, R1, E, E1, I, I1, L, L1, Z, Z1>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>): Sink<R & R1, E | E1, I & I1, L | L1, Tp.Tuple<[Z, Z1]>>;
/**
 * Runs both sinks in parallel on the input and combines the results in a tuple.
 */
export declare function zipPar<R1, E1, I1, L1, Z1>(that: Sink<R1, E1, I1, L1, Z1>): <R, E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & I1, L1 | L, Tp.Tuple<[Z, Z1]>>;
/**
 * Like `zipPar`, but keeps only the result from this sink.
 */
export declare function zipParLeft_<R, R1, E, E1, I, I1, L, L1, Z>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, unknown>): Sink<R & R1, E | E1, I & I1, L | L1, Z>;
/**
 * Like `zipPar`, but keeps only the result from this sink.
 */
export declare function zipParLeft<R1, E1, I1, L1>(that: Sink<R1, E1, I1, L1, unknown>): <R, E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & I1, L1 | L, Z>;
/**
 * Like `zipPar`, but keeps only the result from the `that` sink.
 */
export declare function zipParRight_<R, R1, E, E1, I, I1, L, L1, Z, Z1>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>): Sink<R & R1, E | E1, I & I1, L | L1, Z1>;
/**
 * Like `zipPar`, but keeps only the result from the `that` sink.
 */
export declare function zipParRight<R1, E1, I1, L1, Z1>(that: Sink<R1, E1, I1, L1, Z1>): <R, E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & I1, L1 | L, Z1>;
/**
 * Like `zip`, but keeps only the result from this sink.
 */
export declare function zipRight_<R, R1, E, E1, I, I1 extends I, L extends I1, L1, Z, Z1>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>): Sink<R & R1, E | E1, I & L1 & I1, L | L1, Z1>;
/**
 * Like `zip`, but keeps only the result from this sink.
 */
export declare function zipRight<R1, E1, I, I1 extends I, L1, Z, Z1>(that: Sink<R1, E1, I1, L1, Z1>): <R, E, L extends I1>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & L1 & I1, L1 | L, Z1>;
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, finally combining the two results with `f`.
 */
export declare function zipWith_<R, R1, E, E1, I, I1 extends I, L extends I1, L1, Z, Z1, Z2>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>, f: (z: Z, z1: Z1) => Z2): Sink<R & R1, E | E1, I & I1, L | L1, Z2>;
/**
 * Feeds inputs to this sink until it yields a result, then switches over to the
 * provided sink until it yields a result, finally combining the two results with `f`.
 */
export declare function zipWith<R1, E1, I, I1 extends I, L1, Z, Z1, Z2>(that: Sink<R1, E1, I1, L1, Z1>, f: (z: Z, z1: Z1) => Z2): <R, E, L extends I1>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & I1, L1 | L, Z2>;
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 */
export declare function zipWithPar_<R, R1, E, E1, I, I1, L, L1, Z, Z1, Z2>(self: Sink<R, E, I, L, Z>, that: Sink<R1, E1, I1, L1, Z1>, f: (z: Z, z1: Z1) => Z2): Sink<R & R1, E | E1, I & I1, L | L1, Z2>;
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 */
export declare function zipWithPar<R1, E1, I1, L1, Z, Z1, Z2>(that: Sink<R1, E1, I1, L1, Z1>, f: (z: Z, z1: Z1) => Z2): <R, E, I, L>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I & I1, L1 | L, Z2>;
/**
 * Exposes leftover
 */
export declare function exposeLeftover<R, E, I, L, Z>(self: Sink<R, E, I, L, Z>): Sink<R, E, I, never, Tp.Tuple<[Z, A.Chunk<L>]>>;
/**
 * Drops any leftover
 */
export declare function dropLeftover<R, E, I, L, Z>(self: Sink<R, E, I, L, Z>): Sink<R, E, I, never, Z>;
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 */
export declare function untilOutputM_<R, R1, E, E1, I, L extends I, Z>(self: Sink<R, E, I, L, Z>, f: (z: Z) => T.Effect<R1, E1, boolean>): Sink<R & R1, E | E1, I, L, O.Option<Z>>;
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 */
export declare function untilOutputM<R1, E1, Z>(f: (z: Z) => T.Effect<R1, E1, boolean>): <R, E, I, L extends I>(self: Sink<R, E, I, L, Z>) => Sink<R & R1, E1 | E, I, L, O.Option<Z>>;
/**
 * Provides the sink with its required environment, which eliminates
 * its dependency on `R`.
 */
export declare function provideAll_<R, E, I, L, Z>(self: Sink<R, E, I, L, Z>, r: R): Sink<unknown, E, I, L, Z>;
/**
 * Provides the sink with its required environment, which eliminates
 * its dependency on `R`.
 */
export declare function provideAll<R>(r: R): <E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<unknown, E, I, L, Z>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */
export declare function provideSome_<R0, R, E, I, L, Z>(self: Sink<R, E, I, L, Z>, f: (r0: R0) => R): Sink<R0, E, I, L, Z>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */
export declare function provideSome<R0, R>(f: (r0: R0) => R): <E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R0, E, I, L, Z>;
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 */
export declare function provideLayer<R2, R>(layer: L.Layer<R2, never, R>): <E, I, L, Z>(self: Sink<R, E, I, L, Z>) => Sink<R2, E, I, L, Z>;
/**
 * Provides a layer to the `Managed`, which translates it to another level.
 */
export declare function provideLayer_<R, E, I, L, Z, R2>(self: Sink<R, E, I, L, Z>, layer: L.Layer<R2, never, R>): Sink<R2, E, I, L, Z>;
/**
 * Splits the environment into two parts, providing one part using the
 * specified layer and leaving the remainder `R0`.
 */
export declare function provideSomeLayer<R2, R>(layer: L.Layer<R2, never, R>): <R0, E, I, L, Z>(self: Sink<R & R0, E, I, L, Z>) => Sink<R0 & R2, E, I, L, Z>;
/**
 * Creates a Sink from a managed `Push`
 */
export declare function managedPush<R, E, I, L, Z>(push: M.Managed<R, never, Push.Push<R, E, I, L, Z>>): Sink<R, E, I, L, Z>;
/**
 * Accesses the environment of the sink in the context of a sink.
 */
export declare function accessM<R, R2, E, I, L, Z>(f: (r: R) => Sink<R2, E, I, L, Z>): Sink<R & R2, E, I, L, Z>;
/**
 * A sink that collects all of its inputs into an array.
 */
export declare function collectAll<A>(): Sink<unknown, never, A, never, A.Chunk<A>>;
/**
 * A sink that collects all of its inputs into an list.
 */
export declare function collectAllToList<A>(): Sink<unknown, never, A, never, List.List<A>>;
/**
 * A sink that collects all of its inputs into a map. The keys are extracted from inputs
 * using the keying function `key`; if multiple inputs use the same key, they are merged
 * using the `f` function.
 */
export declare function collectAllToMap<A, K>(key: (a: A) => K): (f: (a: A, a1: A) => A) => Sink<unknown, never, A, never, MP.Map<K, A>>;
/**
 * A sink that collects all of its inputs into a set.
 */
export declare function collectAllToSet<A>(): Sink<unknown, never, A, never, Set<A>>;
/**
 * A sink that counts the number of elements fed to it.
 */
export declare const count: Sink<unknown, never, unknown, never, number>;
/**
 * Creates a sink halting with the specified `Throwable`.
 */
export declare function die(e: unknown): Sink<unknown, never, unknown, never, never>;
/**
 * Creates a sink halting with the specified message, wrapped in a
 * `RuntimeException`.
 */
export declare function dieMessage(m: string): Sink<unknown, never, unknown, never, never>;
/**
 * A sink that ignores its inputs.
 */
export declare const drain: Sink<unknown, never, unknown, never, void>;
/**
 * A sink that always fails with the specified error.
 */
export declare function fail<E>(e: E): <I>() => Sink<unknown, E, I, I, never>;
/**
 * A sink that folds its inputs with the provided function, termination predicate and initial state.
 */
export declare function reduce<S, I>(z: S, contFn: (s: S) => boolean, f: (s: S, i: I) => S): Sink<unknown, never, I, I, S>;
/**
 * A sink that folds its input chunks with the provided function, termination predicate and initial state.
 * `contFn` condition is checked only for the initial value and at the end of processing of each chunk.
 * `f` and `contFn` must preserve chunking-invariance.
 */
export declare function reduceChunks<Z>(z: Z): (contFn: (s: Z) => boolean) => <I>(f: (s: Z, i: A.Chunk<I>) => Z) => Sink<unknown, never, I, I, Z>;
/**
 * A sink that effectfully folds its input chunks with the provided function, termination predicate and initial state.
 * `contFn` condition is checked only for the initial value and at the end of processing of each chunk.
 * `f` and `contFn` must preserve chunking-invariance.
 */
export declare function reduceChunksM<S>(z: S): (contFn: (s: S) => boolean) => <R, E, I>(f: (a: S, i: A.Chunk<I>) => T.Effect<R, E, S>) => Sink<R, E, I, I, S>;
/**
 * A sink that effectfully folds its inputs with the provided function, termination predicate and initial state.
 *
 * This sink may terminate in the middle of a chunk and discard the rest of it. See the discussion on the
 * ZSink class scaladoc on sinks vs. transducers.
 */
export declare function reduceM<S, R, E, I>(z: S, contFn: (s: S) => boolean, f: (s: S, i: I) => T.Effect<R, E, S>): Sink<R, E, I, I, S>;
/**
 * A sink that folds its inputs with the provided function and initial state.
 */
export declare function reduceLeft<S>(z: S): <I>(f: (s: S, i: I) => S) => Sink<unknown, never, I, never, S>;
/**
 * A sink that folds its input chunks with the provided function and initial state.
 * `f` must preserve chunking-invariance.
 */
export declare function reduceLeftChunks<S>(z: S): <I>(f: (s: S, i: A.Chunk<I>) => S) => Sink<unknown, never, I, never, S>;
/**
 * A sink that effectfully folds its input chunks with the provided function and initial state.
 * `f` must preserve chunking-invariance.
 */
export declare function reduceLeftChunksM<S>(z: S): <R, E, I>(f: (s: S, i: A.Chunk<I>) => T.Effect<R, E, S>) => Sink<R, E, I, never, S>;
/**
 * A sink that effectfully folds its inputs with the provided function and initial state.
 */
export declare function reduceLeftM<S>(z: S): <R, E, I>(f: (s: S, i: I) => T.Effect<R, E, S>) => Sink<R, E, I, never, S>;
/**
 * A sink that executes the provided effectful function for every element fed to it.
 */
export declare function forEach<I, R1, E1, X>(f: (i: I) => T.Effect<R1, E1, X>): Sink<R1, E1, I, I, void>;
/**
 * A sink that executes the provided effectful function for every chunk fed to it.
 */
export declare function forEachChunk<R, E, I, X>(f: (a: A.Chunk<I>) => T.Effect<R, E, X>): Sink<R, E, I, never, void>;
/**
 * A sink that executes the provided effectful function for every element fed to it
 * until `f` evaluates to `false`.
 */
export declare function forEachWhile<R, E, I>(f: (i: I) => T.Effect<R, E, boolean>): Sink<R, E, I, I, void>;
/**
 * Creates a single-value sink produced from an effect
 */
export declare function fromEffect<R, E, Z>(b: T.Effect<R, E, Z>): <I>() => Sink<R, E, I, I, Z>;
/**
 * Creates a sink from a Push
 */
export declare function fromPush<R, E, I, L, Z>(push: Push.Push<R, E, I, L, Z>): Sink<R, E, I, L, Z>;
/**
 * Creates a sink halting with a specified cause.
 */
export declare function halt<E>(e: C.Cause<E>): Sink<unknown, E, unknown, never, never>;
/**
 * Creates a sink containing the first value.
 */
export declare function head<I>(): Sink<unknown, never, I, I, O.Option<I>>;
/**
 * Creates a sink containing the last value.
 */
export declare function last<I>(): Sink<unknown, never, I, never, O.Option<I>>;
/**
 * A sink that depends on another managed value
 * `resource` will be finalized after the processing.
 *
 * @deprecated Use unwrapManaged
 */
export declare function managed_<R, E, A, I, L extends I, Z>(resource: M.Managed<R, E, A>, fn: (a: A) => Sink<R, E, I, L, Z>): M.Managed<R, never, Push.Push<R, E, I, I, Z>>;
/**
 * A sink that depends on another managed value
 * `resource` will be finalized after the processing.
 *
 * @deprecated Use unwrapManaged
 */
export declare function managed<R, E, A>(resource: M.Managed<R, E, A>): <I, L extends I, Z>(fn: (a: A) => Sink<R, E, I, L, Z>) => M.Managed<R, never, Push.Push<R, E, I, I, Z>>;
/**
 * A sink that immediately ends with the specified value.
 */
export declare function succeed<Z, I>(z: Z): Sink<unknown, never, I, I, Z>;
/**
 * A sink that sums incoming numeric values.
 */
export declare const sum: Sink<unknown, never, number, never, number>;
/**
 * A sink that takes the specified number of values.
 */
export declare function take<I>(n: number): Sink<unknown, never, I, I, A.Chunk<I>>;
/**
 * A sink with timed execution.
 */
export declare const timedDrain: Sink<HasClock, never, unknown, never, number>;
/**
 * A sink that executes the provided effectful function for every chunk fed to it.
 */
export declare function foreachChunk<R, E, I, A>(f: (c: A.Chunk<I>) => T.Effect<R, E, A>): Sink<R, E, I, never, void>;
/**
 * Create a sink which enqueues each element into the specified queue.
 */
export declare function fromQueue<R, E, I, A>(queue: Q.XQueue<R, never, E, unknown, I, A>): Sink<R, E, I, never, void>;
/**
 * Create a sink which enqueues each element into the specified queue.
 * The queue will be shutdown once the stream is closed.
 */
export declare function fromQueueWithShutdown<R, E, I, A>(queue: Q.XQueue<R, never, E, unknown, I, A>): Sink<R, E, I, never, void>;
/**
 * Create a sink which publishes each element to the specified hub.
 */
export declare function fromHub<R, E, I, A>(hub: H.XHub<R, never, E, unknown, I, A>): Sink<R, E, I, never, void>;
/**
 * Create a sink which publishes each element to the specified hub.
 * The hub will be shutdown once the stream is closed.
 */
export declare function fromHubWithShutdown<R, E, I, A>(hub: H.XHub<R, never, E, unknown, I, A>): Sink<R, E, I, never, void>;
/**
 * Creates a sink produced from an effect.
 */
export declare function unwrap<R, E, I, L extends I, Z>(effect: T.Effect<R, E, Sink<R, E, I, L, Z>>): Sink<R, E, I, I, Z>;
/**
 * Creates a sink produced from a managed effect.
 */
export declare function unwrapManaged<R, E, I, L extends I, Z>(managed: M.Managed<R, E, Sink<R, E, I, L, Z>>): Sink<R, E, I, I, Z>;
//# sourceMappingURL=index.d.ts.map