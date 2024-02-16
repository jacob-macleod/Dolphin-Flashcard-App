/**
 * adapted from https://github.com/gcanti/fp-ts
 */
import "../../../Operator/index.js";
import type { Predicate, Refinement } from "../../../Function/core.js";
import type { Option } from "../../../Option/index.js";
import type { MutableArray } from "../../../Support/Mutable/index.js";
import type { NonEmptyArray } from "../NonEmptyArray/index.js";
import * as Tp from "../Tuple/index.js";
export declare type Array<A> = ReadonlyArray<A>;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @ets_data_first chain_
 */
export declare function chain<A, B>(f: (a: A) => Array<B>): (ma: Array<A>) => Array<B>;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 */
export declare function chain_<A, B>(fa: Array<A>, f: (a: A) => Array<B>): Array<B>;
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `split(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `split`; it satisfies the property that
 *
 * ```ts
 * split(n)(xs).concat(split(n)(ys)) == split(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @ets_data_first split_
 */
export declare function split(n: number): <A>(as: Array<A>) => Array<Array<A>>;
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `split(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `split`; it satisfies the property that
 *
 * ```ts
 * split(n)(xs).concat(split(n)(ys)) == split(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 */
export declare function split_<A>(as: Array<A>, n: number): Array<Array<A>>;
/**
 * Filter out optional values
 */
export declare function compact<A>(fa: Array<Option<A>>): Array<A>;
/**
 * Concatenate
 */
export declare function concat_<A, A1>(x: Array<A>, y: Array<A1>): Array<A | A1>;
/**
 * Concatenate
 *
 * @ets_data_first concat_
 */
export declare function concat<A1>(y: Array<A1>): <A>(x: Array<A>) => Array<A1 | A>;
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * ```ts
 * assert.deepStrictEqual(prepend_(0, [1, 2, 3]), [0, 1, 2, 3])
 * ```
 */
export declare function prepend_<A>(tail: Array<A>, head: A): Array<A>;
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @ets_data_first prepend_
 */
export declare function prepend<A>(head: A): (tail: Array<A>) => Array<A>;
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * ```ts
 * assert.deepStrictEqual(drop(2)([1, 2, 3]), [3])
 * ```
 *
 * @ets_data_first drop_
 */
export declare function drop(n: number): <A>(as: Array<A>) => Array<A>;
/**
 * Drop a number of elements from the start of an array, creating a new array
 */
export declare function drop_<A>(as: Array<A>, n: number): Array<A>;
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * ```ts
 * assert.deepStrictEqual(dropWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 * ```
 *
 * @ets_data_first dropWhile_
 */
export declare function dropWhile<A>(predicate: Predicate<A>): (as: Array<A>) => Array<A>;
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * ```
 * assert.deepStrictEqual(dropWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 * ```
 */
export declare function dropWhile_<A>(as: Array<A>, predicate: Predicate<A>): Array<A>;
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * ```
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 * ```
 *
 * @ets_data_first dropRight_
 */
export declare function dropRight(n: number): <A>(as: Array<A>) => Array<A>;
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * ```
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 * ```
 */
export declare function dropRight_<A>(as: Array<A>, n: number): Array<A>;
/**
 * An empty array
 */
export declare function empty<A>(): Array<A>;
/**
 * Filters the array
 *
 * @ets_data_first filter_
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (fa: Array<A>) => Array<B>;
export declare function filter<A>(predicate: Predicate<A>): (fa: Array<A>) => Array<A>;
/**
 * Filters the array
 */
export declare function filter_<A, B extends A>(fa: Array<A>, refinement: Refinement<A, B>): Array<B>;
export declare function filter_<A>(fa: Array<A>, predicate: Predicate<A>): Array<A>;
/**
 * Filters the array also passing element index
 *
 * @ets_data_first filterWithIndex_
 */
export declare function filterWithIndex<A>(predicate: (i: number, a: A) => boolean): (nea: Array<A>) => Array<A>;
/**
 * Filters the array also passing element index
 */
export declare function filterWithIndex_<A>(nea: Array<A>, predicate: (i: number, a: A) => boolean): Array<A>;
/**
 * Filters the array also mapping the output
 *
 * @ets_data_first collect_
 */
export declare const collect: <A, B>(f: (a: A) => Option<B>) => (fa: Array<A>) => Array<B>;
/**
 * Filters the array also mapping the output
 */
export declare function collect_<A, B>(fa: Array<A>, f: (a: A) => Option<B>): Array<B>;
/**
 * Filters the array also mapping the output
 *
 * @ets_data_first collectWithIndex_
 */
export declare function collectWithIndex<A, B>(f: (i: number, a: A) => Option<B>): (fa: Array<A>) => Array<B>;
/**
 * Filters the array also mapping the output
 */
export declare function collectWithIndex_<A, B>(fa: Array<A>, f: (i: number, a: A) => Option<B>): Array<B>;
/**
 * Maps an array until `none` is returned
 */
export declare function collectWhile_<A, B>(arr: Array<A>, f: (x: A) => Option<B>): Array<B>;
/**
 * Maps an array until `none` is returned
 *
 * @ets_data_first collectWhile_
 */
export declare function collectWhile<A, B>(f: (x: A) => Option<B>): (arr: Array<A>) => Array<B>;
/**
 * Find the first element which satisfies a predicate (or a refinement) function
 *
 * ```ts
 * assert.deepStrictEqual(find((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 1 }))
 * ```
 *
 * @ets_data_first find_
 */
export declare function find<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Option<B>;
export declare function find<A>(predicate: Predicate<A>): (as: Array<A>) => Option<A>;
/**
 * Find the first element which satisfies a predicate (or a refinement) function
 */
export declare function find_<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Option<B>;
export declare function find_<A>(as: Array<A>, predicate: Predicate<A>): Option<A>;
/**
 * Find the first element which satisfies a predicate (or a refinement) function
 */
export declare function findWithIndex_<A, B extends A>(as: Array<A>, refinement: (i: number, a: A) => a is B): Option<B>;
export declare function findWithIndex_<A>(as: Array<A>, predicate: (i: number, a: A) => boolean): Option<A>;
/**
 * Find the first element which satisfies a predicate (or a refinement) function
 *
 *  @ets_data_first findWithIndex_
 */
export declare function findWithIndex<A, B extends A>(refinement: (i: number, a: A) => a is B): (as: Array<A>) => Option<B>;
export declare function findWithIndex<A>(predicate: (i: number, a: A) => boolean): (as: Array<A>) => Option<A>;
/**
 * Find the first index for which a predicate holds
 *
 * ```
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 * ```
 *
 * @ets_data_first findIndex_
 */
export declare function findIndex<A>(predicate: Predicate<A>): (as: Array<A>) => Option<number>;
/**
 * Find the first index for which a predicate holds
 */
export declare function findIndex_<A>(as: Array<A>, predicate: Predicate<A>): Option<number>;
/**
 * Find the last element which satisfies a predicate function
 *
 * ```
 * assert.deepStrictEqual(findLast((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 2 }))
 * ```
 *
 * @ets_data_first findLast_
 */
export declare function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Option<B>;
export declare function findLast<A>(predicate: Predicate<A>): (as: Array<A>) => Option<A>;
/**
 * Find the last element which satisfies a predicate function
 */
export declare function findLast_<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Option<B>;
export declare function findLast_<A>(as: Array<A>, predicate: Predicate<A>): Option<A>;
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * ```ts
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 * ```
 *
 * @ets_data_first findLastIndex_
 */
export declare function findLastIndex<A>(predicate: Predicate<A>): (as: Array<A>) => Option<number>;
/**
 * Returns the index of the last element of the list which matches the predicate
 */
export declare function findLastIndex_<A>(as: Array<A>, predicate: Predicate<A>): Option<number>;
/**
 * Removes one level of nesting
 *
 * ```ts
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 * ```
 */
export declare function flatten<A>(mma: Array<Array<A>>): Array<A>;
/**
 * Copies a mutable array into an immutable
 */
export declare function fromMutable<A>(as: MutableArray<A>): Array<A>;
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * ```ts
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 * ```
 */
export declare function head<A>(as: Array<A>): Option<A>;
/**
 * Test whether an array is empty
 *
 * ```
 * assert.strictEqual(isEmpty([]), true)
 * ```
 */
export declare function isEmpty<A>(as: Array<A>): boolean;
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`
 */
export declare function isNonEmpty<A>(as: Array<A>): as is NonEmptyArray<A>;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * ```ts
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 * ```
 */
export declare function last<A>(as: Array<A>): Option<A>;
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * ```ts
 * assert.deepStrictEqual(get(1, [1, 2, 3]), some(2))
 * assert.deepStrictEqual(get(3, [1, 2, 3]), none)
 * ```
 */
export declare function get_<A>(as: Array<A>, i: number): Option<A>;
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @ets_data_first get_
 */
export declare function get(i: number): <A>(as: Array<A>) => Option<A>;
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * ```ts
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy_(5, double), [0, 2, 4, 6, 8])
 * ```
 */
export declare function makeBy_<A>(n: number, f: (i: number) => A): Array<A>;
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @ets_data_first makeBy_
 */
export declare function makeBy<A>(f: (i: number) => A): (n: number) => Array<A>;
/**
 * Apply f to every element of Array<A> returning Array<B>
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): (fa: Array<A>) => Array<B>;
/**
 * Apply f to every element of Array<A> returning Array<B>
 */
export declare function map_<A, B>(fa: Array<A>, f: (a: A) => B): Array<B>;
/**
 * Like map but also passes the index to f
 *
 * @ets_data_first mapWithIndex_
 */
export declare function mapWithIndex<A, B>(f: (i: number, a: A) => B): (fa: Array<A>) => Array<B>;
/**
 * Like map but also passes the index to f
 */
export declare function mapWithIndex_<A, B>(fa: Array<A>, f: (i: number, a: A) => B): Array<B>;
/**
 * Construct an array with a single element
 */
export declare function single<A>(a: A): Array<A>;
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * ```ts
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 * ```
 */
export declare function range(start: number, end: number): Array<number>;
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduce_
 */
export declare function reduce<A, B>(b: B, f: (b: B, a: A) => B): (fa: Array<A>) => B;
/**
 * Construct B by compacting with f over the array from left to right
 */
export declare function reduce_<A, B>(fa: Array<A>, b: B, f: (b: B, a: A) => B): B;
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRight_
 */
export declare function reduceRight<A, B>(b: B, f: (a: A, b: B) => B): (fa: Array<A>) => B;
/**
 * Construct B by compacting with f over the array from right to left
 *
 */
export declare function reduceRight_<A, B>(fa: Array<A>, b: B, f: (a: A, b: B) => B): B;
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRightWithIndex_
 */
export declare function reduceRightWithIndex<A, B>(b: B, f: (i: number, a: A, b: B) => B): (fa: Array<A>) => B;
/**
 * Construct B by compacting with f over the array from right to left
 *
 */
export declare function reduceRightWithIndex_<A, B>(fa: Array<A>, b: B, f: (i: number, a: A, b: B) => B): B;
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduceWithIndex_
 */
export declare function reduceWithIndex<A, B>(b: B, f: (i: number, b: B, a: A) => B): (fa: Array<A>) => B;
/**
 * Construct B by compacting with f over the array from left to right
 */
export declare function reduceWithIndex_<A, B>(fa: Array<A>, b: B, f: (i: number, b: B, a: A) => B): B;
/**
 * Create an array containing a value repeated the specified number of times
 *
 * ```ts
 * assert.deepStrictEqual(replicate_(3, 'a'), ['a', 'a', 'a'])
 * ```
 */
export declare function replicate_<A>(n: number, a: A): Array<A>;
/**
 * Create an array containing a value repeated the specified number of times
 *
 * ```ts
 * assert.deepStrictEqual(replicate_(3, 'a'), ['a', 'a', 'a'])
 * ```
 *
 * @ets_data_first replicate_
 */
export declare function replicate<A>(a: A): (n: number) => Array<A>;
/**
 * Reverse an array, creating a new array
 *
 * ```ts
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 * ```
 */
export declare function reverse<A>(as: Array<A>): Array<A>;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * ```ts
 * assert.deepStrictEqual(append_([1, 2, 3], 4), [1, 2, 3, 4])
 * ```
 */
export declare function append_<A>(init: Array<A>, end: A): Array<A>;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @ets_data_first append_
 */
export declare function append<A>(end: A): (init: Array<A>) => Array<A>;
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * ```ts
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 * ```
 *
 * @ets_data_first aplitAt_
 */
export declare function splitAt(n: number): <A>(as: Array<A>) => Tp.Tuple<[Array<A>, Array<A>]>;
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 */
export declare function splitAt_<A>(as: Array<A>, n: number): Tp.Tuple<[Array<A>, Array<A>]>;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * ```ts
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 * ```
 */
export declare function tail<A>(as: Array<A>): Option<Array<A>>;
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * ```ts
 * assert.deepStrictEqual(take(2)([1, 2, 3]), [1, 2])
 * ```
 *
 * @ets_data_first take_
 */
export declare function take(n: number): <A>(as: Array<A>) => Array<A>;
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 */
export declare function take_<A>(as: Array<A>, n: number): Array<A>;
/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * ```ts
 * assert.deepStrictEqual(takeWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
 * ```
 *
 * @ets_data_first takeWhile_
 */
export declare function takeWhile<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Array<B>;
export declare function takeWhile<A>(predicate: Predicate<A>): (as: Array<A>) => Array<A>;
/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 */
export declare function takeWhile_<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Array<B>;
export declare function takeWhile_<A>(as: Array<A>, predicate: Predicate<A>): Array<A>;
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * ```ts
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 * ```
 *
 * @ets_data_first takeRight_
 */
export declare function takeRight(n: number): <A>(as: Array<A>) => Array<A>;
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 */
export declare function takeRight_<A>(as: Array<A>, n: number): Array<A>;
/**
 * Copies this array into a mutable one
 */
export declare function toMutable<A>(ras: Array<A>): MutableArray<A>;
/**
 * Construct A by unfolding B signaling end with an option
 */
export declare function unfold_<A, B>(b: B, f: (b: B) => Option<Tp.Tuple<[A, B]>>): Array<A>;
/**
 * Construct A by unfolding B signaling end with an option
 *
 * @ets_data_first unfold_
 */
export declare function unfold<A, B>(f: (b: B) => Option<Tp.Tuple<[A, B]>>): (b: B) => Array<A>;
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * ```ts
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 * ```
 */
export declare function unzip<A, B>(as: Array<Tp.Tuple<[A, B]>>): Tp.Tuple<[Array<A>, Array<B>]>;
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * ```ts
 * assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
 * ```
 * @ets_data_first zip_
 */
export declare function zip<B>(fb: Array<B>): <A>(fa: Array<A>) => Array<Tp.Tuple<[A, B]>>;
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 */
export declare function zip_<A, B>(fa: Array<A>, fb: Array<B>): Array<Tp.Tuple<[A, B]>>;
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * ```ts
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 * ```
 */
export declare function zipWith_<A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C): Array<C>;
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<A, B, C>(fb: Array<B>, f: (a: A, b: B) => C): (fa: Array<A>) => Array<C>;
/**
 * Constructs a new readonly array from an interable.
 */
export declare function from<A>(as: Iterable<A>): Array<A>;
/**
 * Joins together string arrays
 */
export declare function join_(as: Array<string>, s: string): string;
/**
 * Joins together string arrays
 *
 * @ets_data_first join_
 */
export declare function join(s: string): (as: Array<string>) => string;
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @ets_data_first chop_
 */
export declare function chop<A, B>(f: (as: NonEmptyArray<A>) => Tp.Tuple<[B, Array<A>]>): (as: Array<A>) => Array<B>;
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 */
export declare function chop_<A, B>(as: Array<A>, f: (as: NonEmptyArray<A>) => Tp.Tuple<[B, Array<A>]>): Array<B>;
/**
 * Test whether an array contains a particular index
 */
export declare function isOutOfBound<A>(i: number, as: Array<A>): boolean;
/**
 * Finds the first index that doesn't satisfy predicate or the length of as
 */
export declare function spanIndex_<A>(as: Array<A>, predicate: Predicate<A>): number;
/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * ```ts
 * assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
 * ```
 *
 * @ets_data_first spanLeft_
 */
export declare function spanLeft<A, B extends A>(refinement: Refinement<A, B>): (as: Array<A>) => Spanned<B, A>;
export declare function spanLeft<A>(predicate: Predicate<A>): (as: Array<A>) => Spanned<A, A>;
/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 */
export declare function spanLeft_<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Spanned<B, A>;
export declare function spanLeft_<A>(as: Array<A>, predicate: Predicate<A>): Spanned<A, A>;
export interface Spanned<I, R> {
    readonly init: Array<I>;
    readonly rest: Array<R>;
}
/**
 * Returns the size of an array
 */
export declare function size<A>(as: Array<A>): number;
/**
 * Returns true if all the elements of the array match a predicate
 */
export declare function forAll_<A>(as: Array<A>, pred: Predicate<A>): boolean;
/**
 * Returns true if all the elements of the array match a predicate
 *
 * @ets_data_first forAll_
 */
export declare function forAll<A>(pred: Predicate<A>): (as: Array<A>) => boolean;
/**
 * Returns true if any the elements of the array match a predicate
 */
export declare function forAny_<A>(as: Array<A>, pred: Predicate<A>): boolean;
/**
 * Returns true if any the elements of the array match a predicate
 *
 * @ets_data_first forAny_
 */
export declare function forAny<A>(pred: Predicate<A>): (as: Array<A>) => boolean;
/**
 * Returns true if the array contains the element
 */
export declare function includes_<A>(as: Array<A>, elem: A): boolean;
/**
 * Returns true if the array contains the element
 *
 * @ets_data_first includes_
 */
export declare function includes<A>(elem: A): (as: Array<A>) => boolean;
/**
 * Returns a copy of the array
 */
export declare function copy<A>(as: Array<A>): Array<A>;
//# sourceMappingURL=core.d.ts.map