import * as O from "../../../Option/index.js";
import * as A from "../Array/index.js";
import type { Chunk } from "./definition.js";
export * from "./definition.js";
/**
 * Builds a chunk of a single value
 */
export declare function single<A>(a: A): Chunk<A>;
/**
 * Builds an empty chunk
 */
export declare function empty<A>(): Chunk<A>;
/**
 * Appends a value to a chunk
 *
 * @ets_data_first append_
 */
export declare function append<A1>(a: A1): <A>(self: Chunk<A>) => Chunk<A1 | A>;
/**
 * Appends a value to a chunk
 */
export declare function append_<A, A1>(self: Chunk<A>, a: A1): Chunk<A | A1>;
/**
 * Prepends a value to a chunk
 *
 * @ets_data_first prepend_
 */
export declare function prepend<A1>(a: A1): <A>(self: Chunk<A>) => Chunk<A1 | A>;
/**
 * Prepends a value to a chunk
 */
export declare function prepend_<A, A1>(self: Chunk<A>, a: A1): Chunk<A | A1>;
/**
 * Concats chunks
 *
 * @ets_data_first concat_
 */
export declare function concat<A1>(that: Chunk<A1>): <A>(self: Chunk<A>) => Chunk<A1 | A>;
/**
 * Concats chunks
 */
export declare function concat_<A, A1>(self: Chunk<A>, that: Chunk<A1>): Chunk<A | A1>;
/**
 * Converts a chunk to an ArrayLike (either Array or Buffer)
 */
export declare function toArrayLike<A>(self: Chunk<A>): ArrayLike<A>;
/**
 * Converts a chunk to an Array
 */
export declare function toArray<A>(self: Chunk<A>): A.Array<A>;
/**
 * Safely get a value
 */
export declare function get_<A>(self: Chunk<A>, n: number): O.Option<A>;
/**
 * Safely get a value
 *
 * @ets_data_first get_
 */
export declare function get(n: number): <A>(self: Chunk<A>) => O.Option<A>;
/**
 * Unsafely get a value
 */
export declare function unsafeGet_<A>(self: Chunk<A>, n: number): A;
/**
 * Safely get a value
 *
 * @ets_data_first unsafeGet_
 */
export declare function unsafeGet(n: number): <A>(self: Chunk<A>) => A;
/**
 * Referential equality check
 */
export declare function equals_<A, B>(self: Chunk<A>, that: Chunk<B>): boolean;
/**
 * Referential equality check
 *
 * @ets_data_first equals_
 */
export declare function equals<B>(that: Chunk<B>): <A>(self: Chunk<A>) => boolean;
/**
 * Takes the first n elements
 */
export declare function take_<A>(self: Chunk<A>, n: number): Chunk<A>;
/**
 * Takes the first n elements
 *
 * @ets_data_first take_
 */
export declare function take(n: number): <A>(self: Chunk<A>) => Chunk<A>;
/**
 * Takes the last n elements
 */
export declare function takeRight_<A>(self: Chunk<A>, n: number): Chunk<A>;
/**
 * Takes the last n elements
 *
 * @ets_data_first takeRight_
 */
export declare function takeRight(n: number): <A>(self: Chunk<A>) => Chunk<A>;
/**
 * Drops the first n elements
 */
export declare function drop_<A>(self: Chunk<A>, n: number): Chunk<A>;
/**
 * Drops the first n elements
 *
 * @ets_data_first drop_
 */
export declare function drop(n: number): <A>(self: Chunk<A>) => Chunk<A>;
/**
 * Drops the first n elements
 */
export declare function dropRight_<A>(self: Chunk<A>, n: number): Chunk<A>;
/**
 * Drops the first n elements
 *
 * @ets_data_first dropRight_
 */
export declare function dropRight(n: number): <A>(self: Chunk<A>) => Chunk<A>;
/**
 * Returns the number of elements in the chunk
 */
export declare function size<A>(self: Chunk<A>): number;
/**
 * Returns a chunk with the elements mapped by the specified function.
 */
export declare function map_<A, B>(self: Chunk<A>, f: (a: A) => B): Chunk<B>;
/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): (self: Chunk<A>) => Chunk<B>;
/**
 * Returns a chunk with the elements mapped by the specified function.
 */
export declare function mapWithIndex_<A, B>(self: Chunk<A>, f: (index: number, a: A) => B): Chunk<B>;
/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @ets_data_first mapWithIndex_
 */
export declare function mapWithIndex<A, B>(f: (index: number, a: A) => B): (self: Chunk<A>) => Chunk<B>;
/**
 * Returns a chunk with the elements mapped by the specified function.
 */
export declare function chain_<A, B>(self: Chunk<A>, f: (a: A) => Chunk<B>): Chunk<B>;
/**
 * Returns a chunk with the elements mapped by the specified function.
 *
 * @ets_data_first chain_
 */
export declare function chain<A, B>(f: (a: A) => Chunk<B>): (self: Chunk<A>) => Chunk<B>;
/**
 * Flattens a chunk of chunks into a single chunk by concatenating all chunks.
 */
export declare function flatten<A>(self: Chunk<Chunk<A>>): Chunk<A>;
/**
 * Returns the first element of this chunk if it exists.
 */
export declare function head<A>(self: Chunk<A>): O.Option<A>;
/**
 * Returns every elements after the first
 */
export declare function tail<A>(self: Chunk<A>): O.Option<Chunk<A>>;
/**
 * Returns the last element of this chunk if it exists.
 */
export declare function last<A>(self: Chunk<A>): O.Option<A>;
/**
 * Returns the first element of this chunk. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `head` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the first element of the chunk.
 */
export declare function unsafeHead<A>(self: Chunk<A>): A;
/**
 * Returns every elements after the first. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `head` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the first element of the chunk.
 */
export declare function unsafeTail<A>(self: Chunk<A>): Chunk<A>;
/**
 * Returns the last element of this chunk. Note that this method is partial
 * in that it will throw an exception if the chunk is empty. Consider using
 * `last` to explicitly handle the possibility that the chunk is empty
 * or iterating over the elements of the chunk in lower level, performance
 * sensitive code unless you really only need the last element of the chunk.
 */
export declare function unsafeLast<A>(self: Chunk<A>): A;
/**
 * Determines if the chunk is empty.
 */
export declare function isEmpty<A>(self: Chunk<A>): boolean;
/**
 * Determines if the chunk is empty.
 */
export declare function isNonEmpty<A>(self: Chunk<A>): boolean;
/**
 * Buckets iterator
 */
export declare function buckets<A>(self: Chunk<A>): Iterable<ArrayLike<A>>;
/**
 * Reverse buckets iterator
 */
export declare function reverseBuckets<A>(self: Chunk<A>): Iterable<ArrayLike<A>>;
/**
 * Reverse buckets iterator
 */
export declare function reverse<A>(self: Chunk<A>): Iterable<A>;
/**
 * Materializes a chunk into a chunk backed by an array. This method can
 * improve the performance of bulk operations.
 */
export declare function materialize<A>(self: Chunk<A>): Chunk<A>;
/**
 * The unit chunk
 */
export declare const unit: Chunk<void>;
/**
 * Build a chunk from a sequence of values
 *
 * NOTE: different from Chunk#from this copies the elements 1 by 1
 * allowing for binary to be correctly stored in typed arrays
 */
export declare function make<Elem extends readonly any[]>(...iter: Elem): Chunk<Elem[number]>;
/**
 * Return a chunk of length `n` with element `i` initialized with `f(i)`
 */
export declare function makeBy_<A>(n: number, f: (i: number) => A): Chunk<A>;
/**
 * Builder
 */
export declare function builder<A>(): ChunkBuilder<A>;
export declare class ChunkBuilder<A> {
    private chunk;
    constructor(chunk: Chunk<A>);
    append(a: A): ChunkBuilder<A>;
    build(): Chunk<A>;
}
//# sourceMappingURL=core.d.ts.map