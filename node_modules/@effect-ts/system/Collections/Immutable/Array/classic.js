"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ap = ap;
exports.ap_ = ap_;
exports.comprehension = comprehension;
exports.deleteAt = deleteAt;
exports.deleteAt_ = deleteAt_;
exports.duplicate = duplicate;
exports.extend = extend;
exports.extend_ = extend_;
exports.findFirstMap = findFirstMap;
exports.findFirstMapWithIndex = findFirstMapWithIndex;
exports.findFirstMapWithIndex_ = findFirstMapWithIndex_;
exports.findFirstMap_ = findFirstMap_;
exports.findLastMap = findLastMap;
exports.findLastMap_ = findLastMap_;
exports.foldLeft = foldLeft;
exports.foldLeft_ = foldLeft_;
exports.foldRight = foldRight;
exports.foldRight_ = foldRight_;
exports.groupBy = groupBy;
exports.groupBy_ = groupBy_;
exports.init = init;
exports.insertAt = insertAt;
exports.insertAt_ = insertAt_;
exports.lefts = lefts;
exports.modifyAt = modifyAt;
exports.modifyAt_ = modifyAt_;
exports.rights = rights;
exports.rotate = rotate;
exports.rotate_ = rotate_;
exports.scanLeft = scanLeft;
exports.scanLeft_ = scanLeft_;
exports.scanRight = scanRight;
exports.scanRight_ = scanRight_;
exports.separate = separate;
exports.takeUntil = takeUntil;
exports.takeUntil_ = takeUntil_;
exports.unsafeDeleteAt = unsafeDeleteAt;
exports.unsafeDeleteAt_ = unsafeDeleteAt_;
exports.unsafeInsertAt = unsafeInsertAt;
exports.unsafeInsertAt_ = unsafeInsertAt_;
exports.unsafeUpdateAt = unsafeUpdateAt;
exports.unsafeUpdateAt_ = unsafeUpdateAt_;
exports.updateAt = updateAt;
exports.updateAt_ = updateAt_;

var _index = /*#__PURE__*/require("../../../Option/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Classic Applicative's ap
 */
function ap(fa) {
  return fab => ap_(fab, fa);
}
/**
 * Classic Applicative's ap
 */


function ap_(fab, fa) {
  return C.flatten(C.map_(fab, f => C.map_(fa, f)));
}

function comprehension(input, f, g = () => true) {
  const go = (scope, input) => {
    if (input.length === 0) {
      return g(...scope) ? [f(...scope)] : C.empty();
    } else {
      return C.chain_(input[0], x => go(C.append_(scope, x), input.slice(1)));
    }
  };

  return go(C.empty(), input);
}
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * ```ts
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 * ```
 */


function deleteAt(i) {
  return as => deleteAt_(as, i);
}
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 */


function deleteAt_(as, i) {
  return C.isOutOfBound(i, as) ? _index.none : (0, _index.some)(unsafeDeleteAt_(as, i));
}
/**
 * Array[A] => Array[Array[A]]
 */


function duplicate(ma) {
  return extend(x => x)(ma);
}
/**
 * Extends calls f with all the progressive slices up to the current element's index,
 * and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 */


function extend(f) {
  return ma => extend_(ma, f);
}
/**
 * Extends calls f with all the progressive slices up to the current element's index,
 * and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 */


function extend_(ma, f) {
  return ma.map((_, i, as) => f(as.slice(i)));
}
/**
 * Find the first element returned by an option based selector function
 *
 * ```ts
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 * ```
 */


function findFirstMap(f) {
  return as => findFirstMap_(as, f);
}
/**
 * Find the first element returned by an option based selector function
 */


function findFirstMap_(as, f) {
  return findFirstMapWithIndex_(as, (_, a) => f(a));
}
/**
 * Find the first element returned by an option based selector function
 */


function findFirstMapWithIndex_(as, f) {
  const len = as.length;

  for (let i = 0; i < len; i++) {
    const v = f(i, as[i]);

    if ((0, _index.isSome)(v)) {
      return v;
    }
  }

  return _index.none;
}
/**
 * Find the first element returned by an option based selector function
 *
 * @ets_data_first findFirstMapWithIndex_
 */


function findFirstMapWithIndex(f) {
  return as => findFirstMapWithIndex_(as, f);
}
/**
 * Find the last element returned by an option based selector function
 *
 * ```ts
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 * ```
 */


function findLastMap(f) {
  return as => findLastMap_(as, f);
}
/**
 * Find the last element returned by an option based selector function
 */


function findLastMap_(as, f) {
  const len = as.length;

  for (let i = len - 1; i >= 0; i--) {
    const v = f(as[i]);

    if ((0, _index.isSome)(v)) {
      return v;
    }
  }

  return _index.none;
}
/**
 * Break an array into its first element and remaining elements
 *
 * ```ts
 * const len: <A>(as: Array<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 * ```
 */


function foldLeft(onNil, onCons) {
  return as => foldLeft_(as, onNil, onCons);
}
/**
 * Break an array into its first element and remaining elements
 */


function foldLeft_(as, onNil, onCons) {
  return C.isEmpty(as) ? onNil() : onCons(as[0], as.slice(1));
}
/**
 * Break an array into its initial elements and the last element
 */


function foldRight(onNil, onCons) {
  return as => foldRight_(as, onNil, onCons);
}
/**
 * Break an array into its initial elements and the last element
 */


function foldRight_(as, onNil, onCons) {
  return C.isEmpty(as) ? onNil() : onCons(as.slice(0, as.length - 1), as[as.length - 1]);
}
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * ```
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 * ```
 */


function init(as) {
  const len = as.length;
  return len === 0 ? _index.none : (0, _index.some)(as.slice(0, len - 1));
}
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * ```
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 * ```
 */


function insertAt(i, a) {
  return as => insertAt_(as, i, a);
}
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 */


function insertAt_(as, i, a) {
  return i < 0 || i > as.length ? _index.none : (0, _index.some)(unsafeInsertAt_(as, i, a));
}
/**
 * Inserts index i (non safe)
 */


function unsafeInsertAt_(as, i, a) {
  const xs = [...as];
  xs.splice(i, 0, a);
  return xs;
}
/**
 * Inserts index i (non safe)
 */


function unsafeInsertAt(i, a) {
  return as => unsafeInsertAt_(as, i, a);
}
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * ```ts
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 * ```
 */


function updateAt(i, a) {
  return as => updateAt_(as, i, a);
}
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 */


function updateAt_(as, i, a) {
  return C.isOutOfBound(i, as) ? _index.none : (0, _index.some)(unsafeUpdateAt_(as, i, a));
}
/**
 * Updates index i (non safe)
 */


function unsafeUpdateAt_(as, i, a) {
  if (as[i] === a) {
    return as;
  } else {
    const xs = [...as];
    xs[i] = a;
    return xs;
  }
}
/**
 * Updates index i (non safe)
 */


function unsafeUpdateAt(i, a) {
  return as => unsafeUpdateAt_(as, i, a);
}
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * ```ts
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 * ```
 */


function lefts(as) {
  const r = [];
  const len = as.length;

  for (let i = 0; i < len; i++) {
    const a = as[i];

    if (a._tag === "Left") {
      r.push(a.left);
    }
  }

  return r;
}
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * ```ts
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 * ```
 */


function modifyAt(i, f) {
  return as => C.isOutOfBound(i, as) ? _index.none : (0, _index.some)(unsafeUpdateAt_(as, i, f(as[i])));
}
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 */


function modifyAt_(as, i, f) {
  return C.isOutOfBound(i, as) ? _index.none : (0, _index.some)(unsafeUpdateAt_(as, i, f(as[i])));
}
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * ```ts
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 * ```
 */


function rights(as) {
  const r = [];
  const len = as.length;

  for (let i = 0; i < len; i++) {
    const a = as[i];

    if (a._tag === "Right") {
      r.push(a.right);
    }
  }

  return r;
}
/**
 * Rotate an array to the right by `n` steps
 *
 * ```ts
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * ```
 */


function rotate(n) {
  return as => rotate_(as, n);
}
/**
 * Rotate an array to the right by `n` steps
 */


function rotate_(as, n) {
  const len = as.length;

  if (n === 0 || len <= 1 || len === Math.abs(n)) {
    return as;
  } else if (n < 0) {
    return rotate(len + n)(as);
  } else {
    return as.slice(-n).concat(as.slice(0, len - n));
  }
}
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * ```ts
 * import { scanLeft } from '@matechs/core/Array'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 * ```
 */


function scanLeft(b, f) {
  return as => scanLeft_(as, b, f);
}
/**
 * Same as `reduce` but it carries over the intermediate steps
 */


function scanLeft_(as, b, f) {
  const l = as.length;
  const r = new Array(l + 1);
  r[0] = b;

  for (let i = 0; i < l; i++) {
    r[i + 1] = f(r[i], as[i]);
  }

  return r;
}
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * ```ts
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 * ```
 */


function scanRight(b, f) {
  return as => scanRight_(as, b, f);
}
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 */


function scanRight_(as, b, f) {
  const l = as.length;
  const r = new Array(l + 1);
  r[l] = b;

  for (let i = l - 1; i >= 0; i--) {
    r[i] = f(as[i], r[i + 1]);
  }

  return r;
}

function takeUntil(predicate) {
  return as => takeUntil_(as, predicate);
}

function takeUntil_(as, predicate) {
  const init = [];

  for (let i = 0; i < as.length; i++) {
    init[i] = as[i];

    if (predicate(as[i])) {
      return init;
    }
  }

  return init;
}
/**
 * Deletes index i (non safe)
 */


function unsafeDeleteAt_(as, i) {
  const xs = [...as];
  xs.splice(i, 1);
  return xs;
}
/**
 * Deletes index i (non safe)
 */


function unsafeDeleteAt(i) {
  return as => unsafeDeleteAt_(as, i);
}
/**
 * Separate Array
 */


function separate(fa) {
  const left = [];
  const right = [];

  for (const e of fa) {
    if (e._tag === "Left") {
      left.push(e.left);
    } else {
      right.push(e.right);
    }
  }

  return Tp.tuple(left, right);
}
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 */


function groupBy(f) {
  return as => groupBy_(as, f);
}
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 */


function groupBy_(as, f) {
  const r = {};

  for (const a of as) {
    const k = f(a); // eslint-disable-next-line no-prototype-builtins

    if (r.hasOwnProperty(k)) {
      r[k].push(a);
    } else {
      r[k] = [a];
    }
  }

  return r;
}
//# sourceMappingURL=classic.js.map