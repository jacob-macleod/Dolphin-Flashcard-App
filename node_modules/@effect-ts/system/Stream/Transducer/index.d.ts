import "../../Operator/index.js";
import type * as C from "../../Cause/index.js";
import * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import type { Predicate, Refinement } from "../../Function/index.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import * as M from "../_internal/managed.js";
export declare class Transducer<R, E, I, O> {
    readonly push: M.Managed<R, never, (c: O.Option<Chunk.Chunk<I>>) => T.Effect<R, E, Chunk.Chunk<O>>>;
    constructor(push: M.Managed<R, never, (c: O.Option<Chunk.Chunk<I>>) => T.Effect<R, E, Chunk.Chunk<O>>>);
}
/**
 * Contract notes for transducers:
 * - When a None is received, the transducer must flush all of its internal state
 *   and remain empty until subsequent Some(Chunk) values.
 *
 *   Stated differently, after a first push(None), all subsequent push(None) must
 *   result in empty [].
 */
export declare const transducer: <R, E, I, O, R1>(push: M.Managed<R, never, (c: O.Option<Chunk.Chunk<I>>) => T.Effect<R1, E, Chunk.Chunk<O>>>) => Transducer<R & R1, E, I, O>;
/**
 * Compose this transducer with another transducer, resulting in a composite transducer.
 */
export declare const andThen: <R1, E1, O, O1>(that: Transducer<R1, E1, O, O1>) => <R, E, I>(self: Transducer<R, E, I, O>) => Transducer<R & R1, E1 | E, I, O1>;
/**
 * Transforms the outputs of this transducer.
 */
export declare function map_<R, E, I, O, O1>(fa: Transducer<R, E, I, O>, f: (o: O) => O1): Transducer<R, E, I, O1>;
/**
 * Transforms the outputs of this transducer.
 */
export declare function map<O, P>(f: (o: O) => P): <R, E, I>(fa: Transducer<R, E, I, O>) => Transducer<R, E, I, P>;
/**
 * Transforms the chunks emitted by this transducer.
 */
export declare function mapChunks_<R, E, I, O, O1>(fa: Transducer<R, E, I, O>, f: (chunks: Chunk.Chunk<O>) => Chunk.Chunk<O1>): Transducer<R, E, I, O1>;
/**
 * Transforms the chunks emitted by this transducer.
 */
export declare function mapChunks<O, O1>(f: (chunks: Chunk.Chunk<O>) => Chunk.Chunk<O1>): <R, E, I>(fa: Transducer<R, E, I, O>) => Transducer<R, E, I, O1>;
/**
 * Effectfully transforms the chunks emitted by this transducer.
 */
export declare function mapChunksM_<R, E, I, O, R1, E1, O1>(fa: Transducer<R, E, I, O>, f: (chunk: Chunk.Chunk<O>) => T.Effect<R1, E1, Chunk.Chunk<O1>>): Transducer<R & R1, E | E1, I, O1>;
/**
 * Effectfully transforms the chunks emitted by this transducer.
 */
export declare function mapChunksM<O, R1, E1, O1>(f: (chunk: Chunk.Chunk<O>) => T.Effect<R1, E1, Chunk.Chunk<O1>>): <R, E, I>(fa: Transducer<R, E, I, O>) => Transducer<R & R1, E | E1, I, O1>;
/**
 * Effectually transforms the outputs of this transducer
 */
export declare function mapM_<R, E, I, O, R1, E1, O1>(fa: Transducer<R, E, I, O>, f: (o: O) => T.Effect<R1, E1, O1>): Transducer<R & R1, E | E1, I, O1>;
/**
 * Effectually transforms the outputs of this transducer
 */
export declare function mapM<O, R1, E1, O1>(f: (o: O) => T.Effect<R1, E1, O1>): <R, E, I>(fa: Transducer<R, E, I, O>) => Transducer<R & R1, E | E1, I, O1>;
/**
 * Transforms the errors of this transducer.
 */
export declare function mapError_<R, E, I, O, E1>(pab: Transducer<R, E, I, O>, f: (e: E) => E1): Transducer<R, E1, I, O>;
/**
 * Transforms the errors of this transducer.
 */
export declare function mapError<E, E1>(f: (e: E) => E1): <R, I, O>(pab: Transducer<R, E, I, O>) => Transducer<R, E1, I, O>;
/**
 * Creates a transducer that always fails with the specified failure.
 */
export declare function fail<E>(e: E): Transducer<unknown, E, unknown, never>;
/**
 * Creates a transducer that always dies with the specified exception.
 */
export declare function die(error: unknown): Transducer<unknown, never, unknown, never>;
/**
 * Creates a transducer that always fails with the specified cause.
 */
export declare function halt<E>(c: C.Cause<E>): Transducer<unknown, E, unknown, never>;
/**
 * The identity transducer. Passes elements through.
 */
export declare function identity<I>(): Transducer<unknown, never, I, I>;
/**
 * Creates a transducer from a chunk processing function.
 */
export declare function fromPush<R, E, I, O>(push: (input: O.Option<Chunk.Chunk<I>>) => T.Effect<R, E, Chunk.Chunk<O>>): Transducer<R, E, I, O>;
/**
 * Creates a transducer that always evaluates the specified effect.
 */
export declare function fromEffect<R, E, A>(task: T.Effect<R, E, A>): Transducer<R, E, unknown, A>;
/**
 * Creates a transducer that purely transforms incoming values.
 */
export declare function fromFunction<I, O>(f: (i: I) => O): Transducer<unknown, never, I, O>;
/**
 * Creates a transducer that effectfully transforms incoming values.
 */
export declare function fromFunctionM<R, E, I, O>(f: (i: I) => T.Effect<R, E, O>): Transducer<R, E, I, O>;
/**
 * Creates a transducer that returns the first element of the stream, if it exists.
 */
export declare function head<O>(): Transducer<unknown, never, O, O.Option<O>>;
/**
 * Creates a transducer that returns the last element of the stream, if it exists.
 */
export declare function last<O>(): Transducer<unknown, never, O, O.Option<O>>;
/**
 * Emits the provided chunk before emitting any other value.
 */
export declare function prepend<O>(values: Chunk.Chunk<O>): Transducer<unknown, never, O, O>;
/**
 * Reads the first n values from the stream and uses them to choose the transducer that will be used for the remainder of the stream.
 * If the stream ends before it has collected n values the partial chunk will be provided to f.
 */
export declare function branchAfter<R, E, I, O>(n: number, f: (c: Chunk.Chunk<I>) => Transducer<R, E, I, O>): Transducer<R, E, I, O>;
/**
 * Creates a transducer that starts consuming values as soon as one fails
 * the predicate `p`.
 */
export declare function dropWhile<I>(predicate: Predicate<I>): Transducer<unknown, never, I, I>;
/**
 * Creates a transducer that starts consuming values as soon as one fails
 * the effectful predicate `p`.
 */
export declare function dropWhileM<R, E, I>(p: (i: I) => T.Effect<R, E, boolean>): Transducer<R, E, I, I>;
/**
 * Creates a transducer by folding over a structure of type `O` for as long as
 * `contFn` results in `true`. The transducer will emit a value when `contFn`
 * evaluates to `false` and then restart the folding.
 */
export declare function fold<I, O>(initial: O, contFn: (o: O) => boolean, f: (output: O, input: I) => O): Transducer<unknown, never, I, O>;
/**
 * Creates a transducer by folding over a structure of type `O`. The transducer will
 * fold the inputs until the stream ends, resulting in a stream with one element.
 */
export declare function foldLeft<I, O>(initial: O, f: (output: O, input: I) => O): Transducer<unknown, never, I, O>;
/**
 * Creates a sink by effectfully folding over a structure of type `S`.
 */
export declare function foldM<R, E, I, O>(initial: O, contFn: (o: O) => boolean, f: (output: O, input: I) => T.Effect<R, E, O>): Transducer<R, E, I, O>;
/**
 * Creates a transducer by effectfully folding over a structure of type `O`. The transducer will
 * fold the inputs until the stream ends, resulting in a stream with one element.
 */
export declare function foldLeftM<R, E, I, O>(initial: O, f: (output: O, input: I) => T.Effect<R, E, O>): Transducer<R, E, I, O>;
/**
 * Creates a transducer that folds elements of type `I` into a structure
 * of type `O` until `max` elements have been folded.
 *
 * Like `foldWeighted`, but with a constant cost function of 1.
 */
export declare function foldUntil<I, O>(initial: O, max: number, f: (output: O, input: I) => O): Transducer<unknown, never, I, O>;
/**
 * Creates a transducer that effectfully folds elements of type `I` into a structure
 * of type `O` until `max` elements have been folded.
 *
 * Like `foldWeightedM`, but with a constant cost function of 1.
 */
export declare function foldUntilM<R, E, I, O>(initial: O, max: number, f: (output: O, input: I) => T.Effect<R, E, O>): Transducer<R, E, I, O>;
/**
 * Creates a transducer that folds elements of type `I` into a structure
 * of type `O`, until `max` worth of elements (determined by the `costFn`)
 * have been folded.
 *
 * The `decompose` function will be used for decomposing elements that
 * cause an `O` aggregate to cross `max` into smaller elements.
 *
 * Be vigilant with this function, it has to generate "simpler" values
 * or the fold may never end. A value is considered indivisible if
 * `decompose` yields the empty chunk or a single-valued chunk. In
 * these cases, there is no other choice than to yield a value that
 * will cross the threshold.
 *
 * The foldWeightedDecomposeM allows the decompose function
 * to return an `Effect` value, and consequently it allows the transducer
 * to fail.
 */
export declare function foldWeightedDecompose<I, O>(initial: O, costFn: (output: O, input: I) => number, max: number, decompose: (input: I) => Chunk.Chunk<I>, f: (output: O, input: I) => O): Transducer<unknown, never, I, O>;
/**
 * Creates a transducer that effectfully folds elements of type `I` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`) have
 * been folded.
 *
 * The `decompose` function will be used for decomposing elements that
 * cause an `S` aggregate to cross `max` into smaller elements. Be vigilant with
 * this function, it has to generate "simpler" values or the fold may never end.
 * A value is considered indivisible if `decompose` yields the empty chunk or a
 * single-valued chunk. In these cases, there is no other choice than to yield
 * a value that will cross the threshold.
 *
 * See foldWeightedDecompose for an example.
 */
export declare function foldWeightedDecomposeM<R, E, I, O>(initial: O, costFn: (output: O, input: I) => T.Effect<R, E, number>, max: number, decompose: (input: I) => T.Effect<R, E, Chunk.Chunk<I>>, f: (output: O, input: I) => T.Effect<R, E, O>): Transducer<R, E, I, O>;
/**
 * Creates a transducer that folds elements of type `I` into a structure
 * of type `O`, until `max` worth of elements (determined by the `costFn`)
 * have been folded.
 *
 * @note Elements that have an individual cost larger than `max` will
 * force the transducer to cross the `max` cost. See `foldWeightedDecompose`
 * for a variant that can handle these cases.
 */
export declare function foldWeighted<I, O>(initial: O, costFn: (o: O, i: I) => number, max: number, f: (o: O, i: I) => O): Transducer<unknown, never, I, O>;
/**
 * Creates a transducer accumulating incoming values into chunks of maximum size `n`.
 */
export declare function collectAllN<I>(n: number): Transducer<unknown, never, I, Chunk.Chunk<I>>;
/**
 * Creates a transducer accumulating incoming values into maps of up to `n` keys. Elements
 * are mapped to keys using the function `key`; elements mapped to the same key will
 * be merged with the function `f`.
 */
export declare function collectAllToMapN<K, I>(n: number, key: (i: I) => K, merge: (i: I, i1: I) => I): Transducer<unknown, never, I, ReadonlyMap<K, I>>;
/**
 * Accumulates incoming elements into a chunk as long as they verify predicate `p`.
 */
export declare function collectAllWhile<I>(p: Predicate<I>): Transducer<unknown, never, I, Chunk.Chunk<I>>;
/**
 * Accumulates incoming elements into a chunk as long as they verify effectful predicate `p`.
 */
export declare function collectAllWhileM<R, E, I>(p: (i: I) => T.Effect<R, E, boolean>): Transducer<R, E, I, Chunk.Chunk<I>>;
/**
 * Filters the outputs of this transducer.
 */
export declare function filter_<R, E, I, O>(fa: Transducer<R, E, I, O>, predicate: Predicate<O>): Transducer<R, E, I, O>;
export declare function filter_<R, E, I, O, B extends O>(fa: Transducer<R, E, I, O>, refinement: Refinement<O, B>): Transducer<R, E, I, B>;
/**
 * Filters the outputs of this transducer.
 */
export declare function filter<O>(predicate: Predicate<O>): <R, E, I>(fa: Transducer<R, E, I, O>) => Transducer<R, E, I, O>;
export declare function filter<O, B extends O>(refinement: Refinement<O, B>): <R, E, I>(fa: Transducer<R, E, I, O>) => Transducer<R, E, I, B>;
/**
 * Filters the inputs of this transducer.
 */
export declare function filterInput_<R, E, I, O>(fa: Transducer<R, E, I, O>, predicate: Predicate<I>): Transducer<R, E, I, O>;
export declare function filterInput_<R, E, I, O, I1 extends I>(fa: Transducer<R, E, I, O>, refinement: Refinement<I, I1>): Transducer<R, E, I1, O>;
/**
 * Filters the inputs of this transducer.
 */
export declare function filterInput<I>(predicate: Predicate<I>): <R, E, O>(fa: Transducer<R, E, I, O>) => Transducer<R, E, I, O>;
export declare function filterInput<I, I1 extends I>(refinement: Refinement<I, I1>): <R, E, O>(fa: Transducer<R, E, I, O>) => Transducer<R, E, I1, O>;
/**
 * Effectually filters the inputs of this transducer.
 */
export declare function filterInputM_<R, E, I, O, R1, E1>(fa: Transducer<R, E, I, O>, predicate: (i: I) => T.Effect<R1, E1, boolean>): Transducer<R & R1, E | E1, I, O>;
/**
 * Effectually filters the inputs of this transducer.
 */
export declare function filterInputM<I, R1, E1>(predicate: (i: I) => T.Effect<R1, E1, boolean>): <R, E, O>(fa: Transducer<R, E, I, O>) => Transducer<R & R1, E | E1, I, O>;
/**
 * Creates a transducer produced from an effect.
 */
export declare function unwrap<R, E, I, O>(effect: T.Effect<R, E, Transducer<R, E, I, O>>): Transducer<R, E, I, O>;
/**
 * Creates a transducer produced from a managed effect.
 */
export declare function unwrapManaged<R, E, I, O>(managed: M.Managed<R, E, Transducer<R, E, I, O>>): Transducer<R, E, I, O>;
//# sourceMappingURL=index.d.ts.map