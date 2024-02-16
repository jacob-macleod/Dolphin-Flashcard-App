// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */

/**
 * Data structure which represents non-empty arrays
 */
import "../../../Operator/index.mjs";
import { none, some } from "../../../Option/index.mjs";
import * as A from "../Array/index.mjs";
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 */

export const prepend_ = A.prepend_;
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @ets_data_first prepend_
 */

export const prepend = A.prepend;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 */

export const append_ = A.append_;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @ets_data_first append_
 */

export const append = A.append;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 */

export function fromArray(as) {
  return A.isNonEmpty(as) ? some(as) : none;
}
/**
 * Takes the first element
 */

export function head(nea) {
  return nea[0];
}
/**
 * Takes the last element
 */

export function tail(nea) {
  return nea.slice(1);
}
/**
 * Reverse the array
 */

export const reverse = A.reverse;
/**
 * Takes the last element
 */

export function last(nea) {
  return nea[nea.length - 1];
}
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 */

export function init(nea) {
  return nea.slice(0, -1);
}
/**
 * Insert an element at the specified index, creating a new array,
 * or returning None if the index is out of bounds
 *
 * @ets_data_first insertAt_
 */

export function insertAt(i, a) {
  return A.insertAt(i, a);
}
/**
 * Insert an element at the specified index, creating a new array,
 * or returning None if the index is out of bounds
 */

export function insertAt_(nea, i, a) {
  return A.insertAt_(nea, i, a);
}
/**
 * Change the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 *
 * @ets_data_first updateAt_
 */

export function updateAt(i, a) {
  return A.updateAt(i, a);
}
/**
 * Change the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 */

export function updateAt_(nea, i, a) {
  return A.updateAt_(nea, i, a);
}
/**
 * Apply a function to the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 *
 * @ets_data_first modifyAt_
 */

export function modifyAt(i, f) {
  return A.modifyAt(i, f);
}
/**
 * Apply a function to the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 */

export function modifyAt_(nea, i, f) {
  return A.modifyAt_(nea, i, f);
}
export function filter(predicate) {
  return nea => filter_(nea, predicate);
}
export function filter_(nea, predicate) {
  return fromArray(A.filter_(nea, predicate));
}
/**
 * Filters the array also passing element index
 *
 * @ets_data_first filterWithIndex_
 */

export function filterWithIndex(predicate) {
  return nea => fromArray(nea.filter((a, i) => predicate(i, a)));
}
/**
 * Filters the array also passing element index
 */

export function filterWithIndex_(nea, predicate) {
  return fromArray(nea.filter((a, i) => predicate(i, a)));
}
/**
 * Construct an array with a single element
 */

export const single = A.single;
export function concat_(fx, fy) {
  return fx.concat(fy);
}
export function concat(fy) {
  return fx => fx.concat(fy);
}
/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess
 * elements of the longer array are discarded.
 */

export const zipWith_ = A.zipWith_;
/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess
 * elements of the longer array are discarded.
 *
 * @ets_data_first zipWith_
 */

export const zipWith = A.zipWith;
/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 */

export const zip_ = A.zip_;
/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 *
 * @ets_data_first zip_
 */

export const zip = A.zip;
/**
 * The function is reverse of zip. Takes an array of pairs
 * and return two corresponding arrays
 */

export const unzip = A.unzip;
/**
 * Classic Applicative's ap
 *
 * @ets_data_first ap_
 */

export const ap = A.ap;
/**
 * Classic Applicative's ap
 */

export const ap_ = A.ap_;
/**
 * Composes computations in sequence, using the return value
 * of one computation to determine the next computation.
 *
 * @ets_data_first chain_
 */

export const chain = A.chain;
/**
 * Composes computations in sequence, using the return value
 * of one computation to determine the next computation.
 */

export const chain_ = A.chain_;
/**
 * Array[A] => Array[Array[A]]
 */

export const duplicate = A.duplicate;
/**
 * Extends calls f with all the progressive slices up to the current
 * element's index, and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 *
 * @ets_data_first extend_
 */

export const extend = A.extend;
/**
 * Extends calls f with all the progressive slices up to the current
 * element's index, and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 */

export const extend_ = A.extend_;
/**
 * Removes one level of nesting
 */

export const flatten = A.flatten;
/**
 * Apply f to every element of Array returning Array
 *
 * @ets_data_first map_
 */

export const map = A.map;
/**
 * Apply f to every element of Array returning Array
 */

export const map_ = A.map_;
/**
 * Like map but also passes the index to f
 *
 * @ets_data_first mapWithIndex_
 */

export const mapWithIndex = A.mapWithIndex;
/**
 * Like map but also passes the index to f
 */

export const mapWithIndex_ = A.mapWithIndex_;
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduce_
 */

export const reduce = A.reduce;
/**
 * Construct B by compacting with f over the array from left to right
 */

export const reduce_ = A.reduce_;
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRight_
 */

export const reduceRight = A.reduceRight;
/**
 * Construct B by compacting with f over the array from right to left
 */

export const reduceRight_ = A.reduceRight_;
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRightWithIndex_
 */

export const reduceRightWithIndex = A.reduceRightWithIndex;
/**
 * Construct B by compacting with f over the array from right to left
 */

export const reduceRightWithIndex_ = A.reduceRightWithIndex_;
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduceWithIndex_
 */

export const reduceWithIndex = A.reduceWithIndex;
/**
 * Construct B by compacting with f over the array from left to right
 */

export const reduceWithIndex_ = A.reduceWithIndex_;
/**
 * Constructs a NonEmptyArray
 */

export function make(arr) {
  return arr;
}
//# sourceMappingURL=index.mjs.map