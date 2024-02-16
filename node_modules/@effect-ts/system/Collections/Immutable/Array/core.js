"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.append = append;
exports.append_ = append_;
exports.chain = chain;
exports.chain_ = chain_;
exports.chop = chop;
exports.chop_ = chop_;
exports.collect = void 0;
exports.collectWhile = collectWhile;
exports.collectWhile_ = collectWhile_;
exports.collectWithIndex = collectWithIndex;
exports.collectWithIndex_ = collectWithIndex_;
exports.collect_ = collect_;
exports.compact = compact;
exports.concat = concat;
exports.concat_ = concat_;
exports.copy = copy;
exports.drop = drop;
exports.dropRight = dropRight;
exports.dropRight_ = dropRight_;
exports.dropWhile = dropWhile;
exports.dropWhile_ = dropWhile_;
exports.drop_ = drop_;
exports.empty = empty;
exports.filter = filter;
exports.filterWithIndex = filterWithIndex;
exports.filterWithIndex_ = filterWithIndex_;
exports.filter_ = filter_;
exports.find = find;
exports.findIndex = findIndex;
exports.findIndex_ = findIndex_;
exports.findLast = findLast;
exports.findLastIndex = findLastIndex;
exports.findLastIndex_ = findLastIndex_;
exports.findLast_ = findLast_;
exports.findWithIndex = findWithIndex;
exports.findWithIndex_ = findWithIndex_;
exports.find_ = find_;
exports.flatten = flatten;
exports.forAll = forAll;
exports.forAll_ = forAll_;
exports.forAny = forAny;
exports.forAny_ = forAny_;
exports.from = from;
exports.fromMutable = fromMutable;
exports.get = get;
exports.get_ = get_;
exports.head = head;
exports.includes = includes;
exports.includes_ = includes_;
exports.isEmpty = isEmpty;
exports.isNonEmpty = isNonEmpty;
exports.isOutOfBound = isOutOfBound;
exports.join = join;
exports.join_ = join_;
exports.last = last;
exports.makeBy = makeBy;
exports.makeBy_ = makeBy_;
exports.map = map;
exports.mapWithIndex = mapWithIndex;
exports.mapWithIndex_ = mapWithIndex_;
exports.map_ = map_;
exports.prepend = prepend;
exports.prepend_ = prepend_;
exports.range = range;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reduceRightWithIndex = reduceRightWithIndex;
exports.reduceRightWithIndex_ = reduceRightWithIndex_;
exports.reduceRight_ = reduceRight_;
exports.reduceWithIndex = reduceWithIndex;
exports.reduceWithIndex_ = reduceWithIndex_;
exports.reduce_ = reduce_;
exports.replicate = replicate;
exports.replicate_ = replicate_;
exports.reverse = reverse;
exports.single = single;
exports.size = size;
exports.spanIndex_ = spanIndex_;
exports.spanLeft = spanLeft;
exports.spanLeft_ = spanLeft_;
exports.split = split;
exports.splitAt = splitAt;
exports.splitAt_ = splitAt_;
exports.split_ = split_;
exports.tail = tail;
exports.take = take;
exports.takeRight = takeRight;
exports.takeRight_ = takeRight_;
exports.takeWhile = takeWhile;
exports.takeWhile_ = takeWhile_;
exports.take_ = take_;
exports.toMutable = toMutable;
exports.unfold = unfold;
exports.unfold_ = unfold_;
exports.unzip = unzip;
exports.zip = zip;
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

require("../../../Operator/index.js");

var _core = /*#__PURE__*/require("../../../Function/core.js");

var _index2 = /*#__PURE__*/require("../../../Option/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * adapted from https://github.com/gcanti/fp-ts
 */

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @ets_data_first chain_
 */
function chain(f) {
  return ma => chain_(ma, f);
}
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 */


function chain_(fa, f) {
  let resLen = 0;
  const l = fa.length;
  const temp = new Array(l);

  for (let i = 0; i < l; i++) {
    const e = fa[i];
    const arr = f(e);
    resLen += arr.length;
    temp[i] = arr;
  }

  const r = Array(resLen);
  let start = 0;

  for (let i = 0; i < l; i++) {
    const arr = temp[i];
    const l = arr.length;

    for (let j = 0; j < l; j++) {
      r[j + start] = arr[j];
    }

    start += l;
  }

  return r;
}
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


function split(n) {
  return as => split_(as, n);
}
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


function split_(as, n) {
  const f = chop(splitAt(n));
  return as.length === 0 ? empty() : isOutOfBound(n - 1, as) ? [as] : f(as);
}
/**
 * Filter out optional values
 */


function compact(fa) {
  return collect(x => x)(fa);
}
/**
 * Concatenate
 */


function concat_(x, y) {
  const lenx = x.length;

  if (lenx === 0) {
    return y;
  }

  const leny = y.length;

  if (leny === 0) {
    return x;
  }

  const r = Array(lenx + leny);

  for (let i = 0; i < lenx; i++) {
    r[i] = x[i];
  }

  for (let i = 0; i < leny; i++) {
    r[i + lenx] = y[i];
  }

  return r;
}
/**
 * Concatenate
 *
 * @ets_data_first concat_
 */


function concat(y) {
  return x => concat_(x, y);
}
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * ```ts
 * assert.deepStrictEqual(prepend_(0, [1, 2, 3]), [0, 1, 2, 3])
 * ```
 */


function prepend_(tail, head) {
  const len = tail.length;
  const r = Array(len + 1);

  for (let i = 0; i < len; i++) {
    r[i + 1] = tail[i];
  }

  r[0] = head;
  return r;
}
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @ets_data_first prepend_
 */


function prepend(head) {
  return tail => prepend_(tail, head);
}
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * ```ts
 * assert.deepStrictEqual(drop(2)([1, 2, 3]), [3])
 * ```
 *
 * @ets_data_first drop_
 */


function drop(n) {
  return as => drop_(as, n);
}
/**
 * Drop a number of elements from the start of an array, creating a new array
 */


function drop_(as, n) {
  return as.slice(n, as.length);
}
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * ```ts
 * assert.deepStrictEqual(dropWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 * ```
 *
 * @ets_data_first dropWhile_
 */


function dropWhile(predicate) {
  return as => dropWhile_(as, predicate);
}
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * ```
 * assert.deepStrictEqual(dropWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 * ```
 */


function dropWhile_(as, predicate) {
  const i = spanIndex_(as, predicate);
  const l = as.length;
  const rest = Array(l - i);

  for (let j = i; j < l; j++) {
    rest[j - i] = as[j];
  }

  return rest;
}
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * ```
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 * ```
 *
 * @ets_data_first dropRight_
 */


function dropRight(n) {
  return as => dropRight_(as, n);
}
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * ```
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 * ```
 */


function dropRight_(as, n) {
  return as.slice(0, as.length - n);
}
/**
 * An empty array
 */


function empty() {
  return [];
}

function filter(predicate) {
  return fa => fa.filter(predicate);
}

function filter_(fa, predicate) {
  return fa.filter(predicate);
}
/**
 * Filters the array also passing element index
 *
 * @ets_data_first filterWithIndex_
 */


function filterWithIndex(predicate) {
  return nea => filterWithIndex_(nea, predicate);
}
/**
 * Filters the array also passing element index
 */


function filterWithIndex_(nea, predicate) {
  return nea.filter((a, i) => predicate(i, a));
}
/**
 * Filters the array also mapping the output
 *
 * @ets_data_first collect_
 */


const collect = f => fa => collect_(fa, f);
/**
 * Filters the array also mapping the output
 */


exports.collect = collect;

function collect_(fa, f) {
  return collectWithIndex_(fa, (_, a) => f(a));
}
/**
 * Filters the array also mapping the output
 *
 * @ets_data_first collectWithIndex_
 */


function collectWithIndex(f) {
  return fa => collectWithIndex_(fa, f);
}
/**
 * Filters the array also mapping the output
 */


function collectWithIndex_(fa, f) {
  const result = [];

  for (let i = 0; i < fa.length; i++) {
    const optionB = f(i, fa[i]);

    if ((0, _index2.isSome)(optionB)) {
      result.push(optionB.value);
    }
  }

  return result;
}
/**
 * Maps an array until `none` is returned
 */


function collectWhile_(arr, f) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const o = f(arr[i]);

    if ((0, _index2.isSome)(o)) {
      result.push(o.value);
    } else {
      break;
    }
  }

  return result;
}
/**
 * Maps an array until `none` is returned
 *
 * @ets_data_first collectWhile_
 */


function collectWhile(f) {
  return arr => collectWhile_(arr, f);
}

function find(predicate) {
  return as => find_(as, predicate);
}

function find_(as, predicate) {
  return findWithIndex_(as, (_, a) => predicate(a));
}

function findWithIndex_(as, predicate) {
  const len = as.length;

  for (let i = 0; i < len; i++) {
    if (predicate(i, as[i])) {
      return (0, _index2.some)(as[i]);
    }
  }

  return _index2.none;
}

function findWithIndex(predicate) {
  return as => findWithIndex_(as, predicate);
}
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


function findIndex(predicate) {
  return as => findIndex_(as, predicate);
}
/**
 * Find the first index for which a predicate holds
 */


function findIndex_(as, predicate) {
  const len = as.length;

  for (let i = 0; i < len; i++) {
    if (predicate(as[i])) {
      return (0, _index2.some)(i);
    }
  }

  return _index2.none;
}

function findLast(predicate) {
  return as => findLast_(as, predicate);
}

function findLast_(as, predicate) {
  const len = as.length;

  for (let i = len - 1; i >= 0; i--) {
    if (predicate(as[i])) {
      return (0, _index2.some)(as[i]);
    }
  }

  return _index2.none;
}
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


function findLastIndex(predicate) {
  return as => findLastIndex_(as, predicate);
}
/**
 * Returns the index of the last element of the list which matches the predicate
 */


function findLastIndex_(as, predicate) {
  const len = as.length;

  for (let i = len - 1; i >= 0; i--) {
    if (predicate(as[i])) {
      return (0, _index2.some)(i);
    }
  }

  return _index2.none;
}
/**
 * Removes one level of nesting
 *
 * ```ts
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 * ```
 */


function flatten(mma) {
  return chain_(mma, _core.identity);
}
/**
 * Copies a mutable array into an immutable
 */


function fromMutable(as) {
  const l = as.length;

  if (l === 0) {
    return empty();
  }

  const ras = Array(l);

  for (let i = 0; i < l; i++) {
    ras[i] = as[i];
  }

  return ras;
}
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * ```ts
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 * ```
 */


function head(as) {
  return isEmpty(as) ? _index2.none : (0, _index2.some)(as[0]);
}
/**
 * Test whether an array is empty
 *
 * ```
 * assert.strictEqual(isEmpty([]), true)
 * ```
 */


function isEmpty(as) {
  return as.length === 0;
}
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`
 */


function isNonEmpty(as) {
  return as.length > 0;
}
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * ```ts
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 * ```
 */


function last(as) {
  return get_(as, as.length - 1);
}
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * ```ts
 * assert.deepStrictEqual(get(1, [1, 2, 3]), some(2))
 * assert.deepStrictEqual(get(3, [1, 2, 3]), none)
 * ```
 */


function get_(as, i) {
  return isOutOfBound(i, as) ? _index2.none : (0, _index2.some)(as[i]);
}
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @ets_data_first get_
 */


function get(i) {
  return as => get_(as, i);
}
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * ```ts
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy_(5, double), [0, 2, 4, 6, 8])
 * ```
 */


function makeBy_(n, f) {
  const r = [];

  for (let i = 0; i < n; i++) {
    r.push(f(i));
  }

  return r;
}
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @ets_data_first makeBy_
 */


function makeBy(f) {
  return n => makeBy_(n, f);
}
/**
 * Apply f to every element of Array<A> returning Array<B>
 *
 * @ets_data_first map_
 */


function map(f) {
  return fa => fa.map(f);
}
/**
 * Apply f to every element of Array<A> returning Array<B>
 */


function map_(fa, f) {
  return fa.map(f);
}
/**
 * Like map but also passes the index to f
 *
 * @ets_data_first mapWithIndex_
 */


function mapWithIndex(f) {
  return fa => mapWithIndex_(fa, f);
}
/**
 * Like map but also passes the index to f
 */


function mapWithIndex_(fa, f) {
  return fa.map((a, i) => f(i, a));
}
/**
 * Construct an array with a single element
 */


function single(a) {
  return [a];
}
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * ```ts
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 * ```
 */


function range(start, end) {
  return makeBy_(end - start + 1, i => start + i);
}
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduce_
 */


function reduce(b, f) {
  return fa => reduce_(fa, b, f);
}
/**
 * Construct B by compacting with f over the array from left to right
 */


function reduce_(fa, b, f) {
  return reduceWithIndex_(fa, b, (_, b, a) => f(b, a));
}
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRight_
 */


function reduceRight(b, f) {
  return fa => reduceRight_(fa, b, f);
}
/**
 * Construct B by compacting with f over the array from right to left
 *
 */


function reduceRight_(fa, b, f) {
  return reduceRightWithIndex_(fa, b, (_, a, b) => f(a, b));
}
/**
 * Construct B by compacting with f over the array from right to left
 *
 * @ets_data_first reduceRightWithIndex_
 */


function reduceRightWithIndex(b, f) {
  return fa => fa.reduceRight((b, a, i) => f(i, a, b), b);
}
/**
 * Construct B by compacting with f over the array from right to left
 *
 */


function reduceRightWithIndex_(fa, b, f) {
  return fa.reduceRight((b, a, i) => f(i, a, b), b);
}
/**
 * Construct B by compacting with f over the array from left to right
 *
 * @ets_data_first reduceWithIndex_
 */


function reduceWithIndex(b, f) {
  return fa => reduceWithIndex_(fa, b, f);
}
/**
 * Construct B by compacting with f over the array from left to right
 */


function reduceWithIndex_(fa, b, f) {
  const l = fa.length;
  let r = b;

  for (let i = 0; i < l; i++) {
    r = f(i, r, fa[i]);
  }

  return r;
}
/**
 * Create an array containing a value repeated the specified number of times
 *
 * ```ts
 * assert.deepStrictEqual(replicate_(3, 'a'), ['a', 'a', 'a'])
 * ```
 */


function replicate_(n, a) {
  return makeBy_(n, () => a);
}
/**
 * Create an array containing a value repeated the specified number of times
 *
 * ```ts
 * assert.deepStrictEqual(replicate_(3, 'a'), ['a', 'a', 'a'])
 * ```
 *
 * @ets_data_first replicate_
 */


function replicate(a) {
  return n => replicate_(n, a);
}
/**
 * Reverse an array, creating a new array
 *
 * ```ts
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 * ```
 */


function reverse(as) {
  return [...as].reverse();
}
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * ```ts
 * assert.deepStrictEqual(append_([1, 2, 3], 4), [1, 2, 3, 4])
 * ```
 */


function append_(init, end) {
  const len = init.length;
  const r = Array(len + 1);

  for (let i = 0; i < len; i++) {
    r[i] = init[i];
  }

  r[len] = end;
  return r;
}
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @ets_data_first append_
 */


function append(end) {
  return init => append_(init, end);
}
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * ```ts
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 * ```
 *
 * @ets_data_first aplitAt_
 */


function splitAt(n) {
  return as => Tp.tuple(as.slice(0, n), as.slice(n));
}
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 */


function splitAt_(as, n) {
  return Tp.tuple(as.slice(0, n), as.slice(n));
}
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * ```ts
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 * ```
 */


function tail(as) {
  return isEmpty(as) ? _index2.none : (0, _index2.some)(as.slice(1));
}
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


function take(n) {
  return as => as.slice(0, n);
}
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 */


function take_(as, n) {
  return as.slice(0, n);
}

function takeWhile(predicate) {
  return as => takeWhile_(as, predicate);
}

function takeWhile_(as, predicate) {
  const i = spanIndex_(as, predicate);
  const init = Array(i);

  for (let j = 0; j < i; j++) {
    init[j] = as[j];
  }

  return init;
}
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


function takeRight(n) {
  return as => takeRight_(as, n);
}
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 */


function takeRight_(as, n) {
  return n === 0 ? empty() : as.slice(-n);
}
/**
 * Copies this array into a mutable one
 */


function toMutable(ras) {
  const l = ras.length;
  const as = Array(l);

  for (let i = 0; i < l; i++) {
    as[i] = ras[i];
  }

  return as;
}
/**
 * Construct A by unfolding B signaling end with an option
 */


function unfold_(b, f) {
  const ret = [];
  let bb = b; // eslint-disable-next-line no-constant-condition

  while (true) {
    const mt = f(bb);

    if ((0, _index2.isSome)(mt)) {
      const [a, b] = mt.value.tuple;
      ret.push(a);
      bb = b;
    } else {
      break;
    }
  }

  return ret;
}
/**
 * Construct A by unfolding B signaling end with an option
 *
 * @ets_data_first unfold_
 */


function unfold(f) {
  return b => unfold_(b, f);
}
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * ```ts
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 * ```
 */


function unzip(as) {
  const fa = [];
  const fb = [];

  for (let i = 0; i < as.length; i++) {
    fa[i] = as[i].get(0);
    fb[i] = as[i].get(1);
  }

  return Tp.tuple(fa, fb);
}
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * ```ts
 * assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
 * ```
 * @ets_data_first zip_
 */


function zip(fb) {
  return zipWith(fb, Tp.tuple);
}
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 */


function zip_(fa, fb) {
  return zipWith_(fa, fb, Tp.tuple);
}
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * ```ts
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 * ```
 */


function zipWith_(fa, fb, f) {
  const fc = [];
  const len = Math.min(fa.length, fb.length);

  for (let i = 0; i < len; i++) {
    fc[i] = f(fa[i], fb[i]);
  }

  return fc;
}
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @ets_data_first zipWith_
 */


function zipWith(fb, f) {
  return fa => zipWith_(fa, fb, f);
}
/**
 * Constructs a new readonly array from an interable.
 */


function from(as) {
  return Array.from(as);
}
/**
 * Joins together string arrays
 */


function join_(as, s) {
  return as.join(s);
}
/**
 * Joins together string arrays
 *
 * @ets_data_first join_
 */


function join(s) {
  return as => as.join(s);
}
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @ets_data_first chop_
 */


function chop(f) {
  return as => chop_(as, f);
}
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 */


function chop_(as, f) {
  const result = [];
  let cs = as;

  while (isNonEmpty(cs)) {
    const {
      tuple: [b, c]
    } = f(cs);
    result.push(b);
    cs = c;
  }

  return result;
}
/**
 * Test whether an array contains a particular index
 */


function isOutOfBound(i, as) {
  return i < 0 || i >= as.length;
}
/**
 * Finds the first index that doesn't satisfy predicate or the length of as
 */


function spanIndex_(as, predicate) {
  const l = as.length;
  let i = 0;

  for (; i < l; i++) {
    if (!predicate(as[i])) {
      break;
    }
  }

  return i;
}

function spanLeft(predicate) {
  return as => spanLeft_(as, predicate);
}

function spanLeft_(as, predicate) {
  const i = spanIndex_(as, predicate);
  const init = Array(i);

  for (let j = 0; j < i; j++) {
    init[j] = as[j];
  }

  const l = as.length;
  const rest = Array(l - i);

  for (let j = i; j < l; j++) {
    rest[j - i] = as[j];
  }

  return {
    init,
    rest
  };
}
/**
 * Returns the size of an array
 */


function size(as) {
  return as.length;
}
/**
 * Returns true if all the elements of the array match a predicate
 */


function forAll_(as, pred) {
  for (const a of as) {
    if (!pred(a)) {
      return false;
    }
  }

  return true;
}
/**
 * Returns true if all the elements of the array match a predicate
 *
 * @ets_data_first forAll_
 */


function forAll(pred) {
  return as => forAll_(as, pred);
}
/**
 * Returns true if any the elements of the array match a predicate
 */


function forAny_(as, pred) {
  for (const a of as) {
    if (pred(a)) {
      return true;
    }
  }

  return false;
}
/**
 * Returns true if any the elements of the array match a predicate
 *
 * @ets_data_first forAny_
 */


function forAny(pred) {
  return as => forAny_(as, pred);
}
/**
 * Returns true if the array contains the element
 */


function includes_(as, elem) {
  for (const a of as) {
    if (a === elem) {
      return true;
    }
  }

  return false;
}
/**
 * Returns true if the array contains the element
 *
 * @ets_data_first includes_
 */


function includes(elem) {
  return as => includes_(as, elem);
}
/**
 * Returns a copy of the array
 */


function copy(as) {
  return as.slice(0);
}
//# sourceMappingURL=core.js.map