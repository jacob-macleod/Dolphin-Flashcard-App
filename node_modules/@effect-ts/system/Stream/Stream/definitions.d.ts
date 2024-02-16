import * as A from "../../Collections/Immutable/Chunk/index.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import type * as M from "../_internal/managed.js";
export declare const StreamURI = "@matechs/core/Eff/StreamURI";
export declare type StreamURI = typeof StreamURI;
/**
 * A `Stream<R, E, O>` is a description of a program that, when evaluated,
 * may emit 0 or more values of type `O`, may fail with errors of type `E`
 * and uses an environment of type `R` and can be sync or async `S`.
 * One way to think of `Stream` is as a `Effect` program that could emit multiple values.
 *
 * This data type can emit multiple `A` values through multiple calls to `next`.
 * Similarly, embedded inside every `Stream` is an Effect program: `Effect< R, Option<E>, A.Chunk<O>>`.
 * This program will be repeatedly evaluated as part of the stream execution. For
 * every evaluation, it will emit a chunk of values or end with an optional failure.
 * A failure of type `None` signals the end of the stream.
 *
 * `Stream` is a purely functional *pull* based stream. Pull based streams offer
 * inherent laziness and backpressure, relieving users of the need to manage buffers
 * between operators. As an optimization, `Stream` does not emit single values, but
 * rather an array of values. This allows the cost of effect evaluation to be
 * amortized.
 *
 * The last important attribute of `Stream` is resource management: it makes
 * heavy use of `Managed` to manage resources that are acquired
 * and released during the stream's lifetime.
 *
 * `Stream` forms a monad on its `O` type parameter, and has error management
 * facilities for its `E` type parameter, modeled similarly to `Effect` (with some
 * adjustments for the multiple-valued nature of `Stream`). These aspects allow
 * for rich and expressive composition of streams.
 *
 * The current encoding of `Stream` is *not* safe for recursion. `Stream` programs
 * that are defined in terms of themselves will leak memory.
 *
 * Instead, recursive operators must be defined explicitly. See the definition of
 * `forever` for an example. This limitation will be lifted in the future.
 */
export declare class Stream<R, E, A> {
    readonly proc: M.Managed<R, never, T.Effect<R, O.Option<E>, A.Chunk<A>>>;
    readonly [T._U]: StreamURI;
    readonly [T._E]: () => E;
    readonly [T._A]: () => A;
    readonly [T._R]: (_: R) => void;
    constructor(proc: M.Managed<R, never, T.Effect<R, O.Option<E>, A.Chunk<A>>>);
}
/**
 * Type aliases
 */
export declare type UIO<A> = Stream<unknown, never, A>;
export declare type IO<E, A> = Stream<unknown, E, A>;
export declare type RIO<R, A> = Stream<R, never, A>;
/**
 * The default chunk size used by the various combinators and constructors of `Stream`.
 */
export declare const DefaultChunkSize = 4096;
//# sourceMappingURL=definitions.d.ts.map