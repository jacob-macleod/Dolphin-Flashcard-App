"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain_ = exports.chain = exports.append_ = exports.append = exports.ap_ = exports.ap = void 0;
exports.concat = concat;
exports.concat_ = concat_;
exports.extend_ = exports.extend = exports.duplicate = void 0;
exports.filter = filter;
exports.filterWithIndex = filterWithIndex;
exports.filterWithIndex_ = filterWithIndex_;
exports.filter_ = filter_;
exports.flatten = void 0;
exports.fromArray = fromArray;
exports.head = head;
exports.init = init;
exports.insertAt = insertAt;
exports.insertAt_ = insertAt_;
exports.last = last;
exports.make = make;
exports.map_ = exports.mapWithIndex_ = exports.mapWithIndex = exports.map = void 0;
exports.modifyAt = modifyAt;
exports.modifyAt_ = modifyAt_;
exports.single = exports.reverse = exports.reduce_ = exports.reduceWithIndex_ = exports.reduceWithIndex = exports.reduceRight_ = exports.reduceRightWithIndex_ = exports.reduceRightWithIndex = exports.reduceRight = exports.reduce = exports.prepend_ = exports.prepend = void 0;
exports.tail = tail;
exports.unzip = void 0;
exports.updateAt = updateAt;
exports.updateAt_ = updateAt_;
exports.zip_ = exports.zipWith_ = exports.zipWith = exports.zip = void 0;

require("../../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../../../Option/index.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Array/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */

/**
 * Data structure which represents non-empty arrays
 */

/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 */
const prepend_ = A.prepend_;
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @ets_data_first prepend_
 */

exports.prepend_ = prepend_;
const prepend = A.prepend;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 */

exports.prepend = prepend;
const append_ = A.append_;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @ets_data_first append_
 */

exports.append_ = append_;
const append = A.append;
/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 */

exports.append = append;

function fromArray(as) {
  return A.isNonEmpty(as) ? (0, _index2.some)(as) : _index2.none;
}
/**
 * Takes the first element
 */


function head(nea) {
  return nea[0];
}
/**
 * Takes the last element
 */


function tail(nea) {
  return nea.slice(1);
}
/**
 * Reverse the array
 */


const reverse = A.reverse;
/**
 * Takes the last element
 */

exports.reverse = reverse;

function last(nea) {
  return nea[nea.length - 1];
}
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 */


function init(nea) {
  return nea.slice(0, -1);
}
/**
 * Insert an element at the specified index, creating a new array,
 * or returning None if the index is out of bounds
 *
 * @ets_data_first insertAt_
 */


function insertAt(i, a) {
  return A.insertAt(i, a);
}
/**
 * Insert an element at the specified index, creating a new array,
 * or returning None if the index is out of bounds
 */


function insertAt_(nea, i, a) {
  return A.insertAt_(nea, i, a);
}
/**
 * Change the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 *
 * @ets_data_first updateAt_
 */


function updateAt(i, a) {
  return A.updateAt(i, a);
}
/**
 * Change the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 */


function updateAt_(nea, i, a) {
  return A.updateAt_(nea, i, a);
}
/**
 * Apply a function to the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 *
 * @ets_data_first modifyAt_
 */


function modifyAt(i, f) {
  return A.modifyAt(i, f);
}
/**
 * Apply a function to the element at the specified index,
 * creating a new array, or returning None if the index is out of bounds
 */


function modifyAt_(nea, i, f) {
  return A.modifyAt_(nea, i, f);
}

function filter(predicate) {
  return nea => filter_(nea, predicate);
}

function filter_(nea, predicate) {
  return fromArray(A.filter_(nea, predicate));
}
/**
 * Filters the array also passing element index
 *
 * @ets_data_first filterWithIndex_
 */


function filterWithIndex(predicate) {
  return nea => fromArray(nea.filter((a, i) => predicate(i, a)));
}
/**
 * Filters the array also passing element index
 */


function filterWithIndex_(nea, predicate) {
  return fromArray(nea.filter((a, i) => predicate(i, a)));
}
/**
 * Construct an array with a single element
 */


const single = A.single;
exports.single = single;

function concat_(fx, fy) {
  return fx.concat(fy);
}

function concat(fy) {
  return fx => fx.concat(fy);
}
/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess
 * elements of the longer array are discarded.
 */


const zipWith_ = A.zipWith_;
/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess
 * elements of the longer array are discarded.
 *
 * @ets_data_first zipWith_
 */

exports.zipWith_ = zipWith_;
const zipWith = A.zipWith;
/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 */

exports.zipWith = zipWith;
const zip_ = A.zip_;
/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 *
 * @ets_data_first zip_
 */

exports.zip_ = zip_;
const zip = A.zip;
/**
 * The function is reverse of zip. Takes an array of pairs
 * and return two corresponding arrays
 */

exports.zip = zip;
const unzip = A.unzip;
/**
 * Classic Applicative's ap
 *
 * @ets_data_first ap_
 */

exports.unzip = unzip;
const ap = A.ap;
/**
 * Classic Applicative's ap
 */

exports.ap = ap;
const ap_ = A.ap_;
/**
 * Composes computations in sequence, using the return value
 * of one computation to determine the next computation.
 *
 * @ets_data_first chain_
 */

exports.ap_ = ap_;
const chain = A.chain;
/**
 * Composes computations in sequence, using the return value
 * of one computation to determine the next computation.
 */

exports.chain = chain;
const chain_ = A.chain_;
/**
 * Array[A] => Array[Array[A]]
 */

exports.chain_ = chain_;
const duplicate = A.duplicate;
/**
 * Extends calls f with all the progressive slices up to the current
 * element's index, and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 *
 * @ets_data_first extend_
 */

exports.duplicate = duplicate;
const extend = A.extend;
/**
 * Extends calls f with all the progressive slices up to the current
 * element's index, and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 */

exports.extend = extend;
const extend_ = A.extend_;
/**
 * Removes one level of nesting
 */

exports.extend_ = extend_;
const flatten = A.flatten;
/**
 * Apply f to every element of Array returning Array
 *
 * @ets_data_first map_
 */

exports.flatten = flatten;
const map = A.map;
/**
 * Apply f to every element of Array returning Array
 */

exports.map = map;
const map_ = A.map_;
/**
 * Like map but also passes the index to f
 *
 * @ets_data_first mapWithIndex_
 */

exports.map_ = map_;
const mapWithIndex = A.mapWithIndex;
/**
 * Like map but also passes the index to f
 */

exports.mapWithIndex = mapWithIndex;
const mapWithIndex_ = A.mapWithIndex_;
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduce_
 */

exports.mapWithIndex_ = mapWithIndex_;
const reduce = A.reduce;
/**
 * Construct B by compacting with f over the array from left to right
 */

exports.reduce = reduce;
const reduce_ = A.reduce_;
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRight_
 */

exports.reduce_ = reduce_;
const reduceRight = A.reduceRight;
/**
 * Construct B by compacting with f over the array from right to left
 */

exports.reduceRight = reduceRight;
const reduceRight_ = A.reduceRight_;
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRightWithIndex_
 */

exports.reduceRight_ = reduceRight_;
const reduceRightWithIndex = A.reduceRightWithIndex;
/**
 * Construct B by compacting with f over the array from right to left
 */

exports.reduceRightWithIndex = reduceRightWithIndex;
const reduceRightWithIndex_ = A.reduceRightWithIndex_;
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduceWithIndex_
 */

exports.reduceRightWithIndex_ = reduceRightWithIndex_;
const reduceWithIndex = A.reduceWithIndex;
/**
 * Construct B by compacting with f over the array from left to right
 */

exports.reduceWithIndex = reduceWithIndex;
const reduceWithIndex_ = A.reduceWithIndex_;
/**
 * Constructs a NonEmptyArray
 */

exports.reduceWithIndex_ = reduceWithIndex_;

function make(arr) {
  return arr;
}
//# sourceMappingURL=index.js.map