/**
 * Data structure which represents non-empty arrays
 */
import "../../../Operator/index.js";
import type { Predicate, Refinement } from "../../../Function/index.js";
import type { Option } from "../../../Option/index.js";
import * as A from "../Array/index.js";
import type * as Tp from "../Tuple/index.js";
export declare type NonEmptyArray<A> = A.Array<A> & {
    readonly 0: A;
};
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 */
export declare const prepend_: <A>(tail: A.Array<A>, head: A) => NonEmptyArray<A>;
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @ets_data_first prepend_
 */
export declare const prepend: <A>(head: A) => (tail: A.Array<A>) => NonEmptyArray<A>;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 */
export declare const append_: <A>(init: A.Array<A>, end: A) => NonEmptyArray<A>;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @ets_data_first append_
 */
export declare const append: <A>(end: A) => (init: A.Array<A>) => NonEmptyArray<A>;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 */
export declare function fromArray<A>(as: A.Array<A>): Option<NonEmptyArray<A>>;
/**
 * Takes the first element
 */
export declare function head<A>(nea: NonEmptyArray<A>): A;
/**
 * Takes the last element
 */
export declare function tail<A>(nea: NonEmptyArray<A>): A.Array<A>;
/**
 * Reverse the array
 */
export declare const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>;
/**
 * Takes the last element
 */
export declare function last<A>(nea: NonEmptyArray<A>): A;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 */
export declare function init<A>(nea: NonEmptyArray<A>): A.Array<A>;
/**
 * Insert an element at the specified index, creating a new array,
 * or returning None if the index is out of bounds
 *
 * @ets_data_first insertAt_
 */
export declare function insertAt<A>(i: number, a: A): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>;
/**
 * Insert an element at the specified index, creating a new array,
 * or returning None if the index is out of bounds
 */
export declare function insertAt_<A>(nea: NonEmptyArray<A>, i: number, a: A): Option<NonEmptyArray<A>>;
/**
 * Change the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 *
 * @ets_data_first updateAt_
 */
export declare function updateAt<A>(i: number, a: A): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>;
/**
 * Change the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 */
export declare function updateAt_<A>(nea: NonEmptyArray<A>, i: number, a: A): Option<NonEmptyArray<A>>;
/**
 * Apply a function to the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 *
 * @ets_data_first modifyAt_
 */
export declare function modifyAt<A>(i: number, f: (a: A) => A): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>;
/**
 * Apply a function to the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 */
export declare function modifyAt_<A>(nea: NonEmptyArray<A>, i: number, f: (a: A) => A): Option<NonEmptyArray<A>>;
/**
 * Filters the array
 *
 * @ets_data_first filter_
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<B>>;
export declare function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>;
/**
 * Filters the array
 */
export declare function filter_<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<NonEmptyArray<B>>;
export declare function filter_<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<NonEmptyArray<A>>;
/**
 * Filters the array also passing element index
 *
 * @ets_data_first filterWithIndex_
 */
export declare function filterWithIndex<A>(predicate: (i: number, a: A) => boolean): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>;
/**
 * Filters the array also passing element index
 */
export declare function filterWithIndex_<A>(nea: NonEmptyArray<A>, predicate: (i: number, a: A) => boolean): Option<NonEmptyArray<A>>;
/**
 * Construct an array with a single element
 */
export declare const single: <A>(a: A) => NonEmptyArray<A>;
/**
 * Concatenate arrays
 */
export declare function concat_<A>(fx: A.Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>;
export declare function concat_<A>(fx: NonEmptyArray<A>, fy: A.Array<A>): NonEmptyArray<A>;
/**
 * Concatenate arrays
 *
 * @ets_data_first concat_
 */
export declare function concat<A>(fy: NonEmptyArray<A>): (fx: A.Array<A>) => NonEmptyArray<A>;
export declare function concat<A>(fy: A.Array<A>): (fx: A.Array<A>) => NonEmptyArray<A>;
/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess
 * elements of the longer array are discarded.
 */
export declare const zipWith_: <A, B, C>(fa: NonEmptyArray<A>, fb: NonEmptyArray<B>, f: (a: A, b: B) => C) => NonEmptyArray<C>;
/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess
 * elements of the longer array are discarded.
 *
 * @ets_data_first zipWith_
 */
export declare const zipWith: <A, B, C>(fb: NonEmptyArray<B>, f: (a: A, b: B) => C) => (fa: NonEmptyArray<A>) => NonEmptyArray<C>;
/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 */
export declare const zip_: <A, B>(fa: NonEmptyArray<A>, fb: NonEmptyArray<B>) => NonEmptyArray<Tp.Tuple<[A, B]>>;
/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 *
 * @ets_data_first zip_
 */
export declare const zip: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<Tp.Tuple<[A, B]>>;
/**
 * The function is reverse of zip. Takes an array of pairs
 * and return two corresponding arrays
 */
export declare const unzip: <A, B>(as: NonEmptyArray<Tp.Tuple<[A, B]>>) => Tp.Tuple<[NonEmptyArray<A>, NonEmptyArray<B>]>;
/**
 * Classic Applicative's ap
 *
 * @ets_data_first ap_
 */
export declare const ap: <A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B>;
/**
 * Classic Applicative's ap
 */
export declare const ap_: <A, B>(fab: NonEmptyArray<(a: A) => B>, fa: NonEmptyArray<A>) => NonEmptyArray<B>;
/**
 * Composes computations in sequence, using the return value
 * of one computation to determine the next computation.
 *
 * @ets_data_first chain_
 */
export declare const chain: <A, B>(f: (a: A) => NonEmptyArray<B>) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>;
/**
 * Composes computations in sequence, using the return value
 * of one computation to determine the next computation.
 */
export declare const chain_: <A, B>(ma: NonEmptyArray<A>, f: (a: A) => NonEmptyArray<B>) => NonEmptyArray<B>;
/**
 * Array[A] => Array[Array[A]]
 */
export declare const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>;
/**
 * Extends calls f with all the progressive slices up to the current
 * element's index, and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 *
 * @ets_data_first extend_
 */
export declare const extend: <A, B>(f: (fa: NonEmptyArray<A>) => B) => (ma: NonEmptyArray<A>) => NonEmptyArray<B>;
/**
 * Extends calls f with all the progressive slices up to the current
 * element's index, and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 */
export declare const extend_: <A, B>(ma: NonEmptyArray<A>, f: (fa: NonEmptyArray<A>) => B) => NonEmptyArray<B>;
/**
 * Removes one level of nesting
 */
export declare const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A>;
/**
 * Apply f to every element of Array returning Array
 *
 * @ets_data_first map_
 */
export declare const map: <A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>;
/**
 * Apply f to every element of Array returning Array
 */
export declare const map_: <A, B>(fa: NonEmptyArray<A>, f: (a: A) => B) => NonEmptyArray<B>;
/**
 * Like map but also passes the index to f
 *
 * @ets_data_first mapWithIndex_
 */
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B>;
/**
 * Like map but also passes the index to f
 */
export declare const mapWithIndex_: <A, B>(fa: NonEmptyArray<A>, f: (i: number, a: A) => B) => NonEmptyArray<B>;
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduce_
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B;
/**
 * Construct B by compacting with f over the array from left to right
 */
export declare const reduce_: <A, B>(fa: NonEmptyArray<A>, b: B, f: (b: B, a: A) => B) => B;
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRight_
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B;
/**
 * Construct B by compacting with f over the array from right to left
 */
export declare const reduceRight_: <A, B>(fa: NonEmptyArray<A>, b: B, f: (a: A, b: B) => B) => B;
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRightWithIndex_
 */
export declare const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B;
/**
 * Construct B by compacting with f over the array from right to left
 */
export declare const reduceRightWithIndex_: <A, B>(fa: NonEmptyArray<A>, b: B, f: (i: number, a: A, b: B) => B) => B;
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduceWithIndex_
 */
export declare const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B;
/**
 * Construct B by compacting with f over the array from left to right
 */
export declare const reduceWithIndex_: <A, B>(fa: NonEmptyArray<A>, b: B, f: (i: number, b: B, a: A) => B) => B;
/**
 * Constructs a NonEmptyArray
 */
export declare function make<T extends readonly [any, ...A.Array<any>]>(arr: T): NonEmptyArray<T[number]>;
//# sourceMappingURL=index.d.ts.map