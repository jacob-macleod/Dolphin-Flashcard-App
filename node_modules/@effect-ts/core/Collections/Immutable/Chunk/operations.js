"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  forEachWithIndexF: true,
  forEachF: true,
  forEachF_: true,
  separateF: true,
  separateWithIndexF: true,
  compactF: true,
  compactWithIndexF: true,
  elem: true,
  elem_: true,
  difference_: true,
  difference: true,
  getEqual: true,
  getIdentity: true,
  getOrd: true,
  getShow: true,
  intersection_: true,
  intersection: true,
  foldMap: true,
  foldMap_: true,
  foldMapWithIndex: true,
  foldMapWithIndex_: true,
  sort: true,
  sort_: true,
  sortBy: true,
  sortBy_: true,
  union_: true,
  union: true,
  uniq_: true,
  uniq: true,
  partition: true,
  partition_: true,
  partitionMapWithIndex_: true,
  partitionMapWithIndex: true,
  partitionWithIndex: true,
  partitionWithIndex_: true
};
exports.compactWithIndexF = exports.compactF = void 0;
exports.difference = difference;
exports.difference_ = difference_;
exports.elem = elem;
exports.elem_ = elem_;
exports.foldMap = foldMap;
exports.foldMapWithIndex = foldMapWithIndex;
exports.foldMapWithIndex_ = foldMapWithIndex_;
exports.foldMap_ = foldMap_;
exports.forEachWithIndexF = exports.forEachF_ = exports.forEachF = void 0;
exports.getEqual = getEqual;
exports.getIdentity = getIdentity;
exports.getOrd = getOrd;
exports.getShow = getShow;
exports.intersection = intersection;
exports.intersection_ = intersection_;
exports.partition = partition;
exports.partitionMapWithIndex = partitionMapWithIndex;
exports.partitionMapWithIndex_ = partitionMapWithIndex_;
exports.partitionWithIndex = partitionWithIndex;
exports.partitionWithIndex_ = partitionWithIndex_;
exports.partition_ = partition_;
exports.separateWithIndexF = exports.separateF = void 0;
exports.sort = sort;
exports.sortBy = sortBy;
exports.sortBy_ = sortBy_;
exports.sort_ = sort_;
exports.union = union;
exports.union_ = union_;
exports.uniq = uniq;
exports.uniq_ = uniq_;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Chunk"));

Object.keys(Chunk).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === Chunk[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return Chunk[key];
    }
  });
});

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Tuple"));

var _Function = /*#__PURE__*/require("@effect-ts/system/Function");

var _index = /*#__PURE__*/require("../../../Equal/index.js");

var _index2 = /*#__PURE__*/require("../../../Identity/index.js");

var Ord = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Ord/index.js"));

var DSL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/DSL/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * `ForEachWithIndex`'s `forEachWithIndexF` function
 */
const forEachWithIndexF = /*#__PURE__*/P.implementForEachWithIndexF()(_ => G => {
  const succeed = DSL.succeedF(G);
  return f => fa => {
    let base = succeed(Chunk.empty());

    for (let k = 0; k < fa.length; k += 1) {
      base = G.map(({
        tuple: [bs, b]
      }) => Chunk.append_(bs, b))(G.both(f(k, Chunk.unsafeGet_(fa, k)))(base));
    }

    return base;
  };
});
/**
 * `ForEach`'s `forEachF` function
 */

exports.forEachWithIndexF = forEachWithIndexF;
const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => forEachWithIndexF(G)((_, a) => f(a)));
/**
 * `ForEach`'s `forEachF` function
 */

exports.forEachF = forEachF;

const forEachF_ = (fa, G) => f => forEachF(G)(f)(fa);
/**
 * `Wilt`'s `separateF` function
 */


exports.forEachF_ = forEachF_;
const separateF = /*#__PURE__*/P.implementSeparateF()(_ => G => f => x => G.map(Chunk.partitionMap(_Function.identity))(forEachF(G)(f)(x)));
/**
 * `Wilt`'s `separateF` function
 */

exports.separateF = separateF;
const separateWithIndexF = /*#__PURE__*/P.implementSeparateWithIndexF()(_ => G => f => x => G.map(Chunk.partitionMap(_Function.identity))(forEachWithIndexF(G)(f)(x)));
/**
 * `Wither`'s `compactF` function
 */

exports.separateWithIndexF = separateWithIndexF;
const compactF = /*#__PURE__*/P.implementCompactF()(_ => G => f => x => G.map(Chunk.compact)(forEachF(G)(f)(x)));
/**
 * `WitherWithIndex`'s `compactWithIndexF` function
 */

exports.compactF = compactF;
const compactWithIndexF = /*#__PURE__*/P.implementCompactWithIndexF()(_ => G => f => x => G.map(Chunk.compact)(forEachWithIndexF(G)(f)(x)));
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Chunk<A>`.
 *
 * @ets_data_first elem_
 */

exports.compactWithIndexF = compactWithIndexF;

function elem(E, a) {
  return as => elem_(as, E, a);
}
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Chunk<A>`.
 */


function elem_(as, E, a) {
  const predicate = element => E.equals(element, a);

  let i = 0;
  const len = as.length;

  for (; i < len; i++) {
    if (predicate(Chunk.unsafeGet_(as, i))) {
      return true;
    }
  }

  return false;
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function difference_(xs, E, ys) {
  return Chunk.filter_(xs, a => !elem_(ys, E, a));
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @ets_data_first difference_
 */


function difference(E, ys) {
  return xs => difference_(xs, E, ys);
}
/**
 * Derives an `Equal` over the `Chunk` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */


function getEqual(E) {
  return (0, _index.makeEqual)((xs, ys) => xs === ys || Chunk.corresponds_(xs, ys, E.equals));
}
/**
 * Returns a `Identity` for `Chunk<A>`
 */


function getIdentity() {
  return (0, _index2.makeIdentity)(Chunk.empty(), Chunk.concat_);
}
/**
 * Returns a `Ord` for `Chunk<A>` given `Ord<A>`
 */


function getOrd(O) {
  return Ord.makeOrd((a, b) => {
    const aLen = a.length;
    const bLen = b.length;
    const len = Math.min(aLen, bLen);

    for (let i = 0; i < len; i++) {
      const ordering = O.compare(Chunk.unsafeGet_(a, i), Chunk.unsafeGet_(b, i));

      if (ordering !== 0) {
        return ordering;
      }
    }

    return Ord.number.compare(aLen, bLen);
  });
}
/**
 * Returns a `Show` for `Chunk<A>` given `Show<A>`
 */


function getShow(S) {
  return {
    show: as => `[${Chunk.join_(Chunk.map_(as, S.show), ", ")}]`
  };
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function intersection_(xs, E, ys) {
  return Chunk.filter_(xs, a => elem_(ys, E, a));
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @ets_data_first intersection_
 */


function intersection(E, ys) {
  return xs => intersection_(xs, E, ys);
}
/**
 * Fold Identity with a mapping function
 */


function foldMap(M) {
  return f => foldMapWithIndex(M)((_, a) => f(a));
}
/**
 * Fold Identity with a mapping function
 */


function foldMap_(fa, M, f) {
  return foldMapWithIndex_(fa, M, (_, a) => f(a));
}
/**
 * Fold Identity with a mapping function that consider also the index
 */


function foldMapWithIndex(M) {
  return f => fa => foldMapWithIndex_(fa, M, f);
}
/**
 * Fold Identity with a mapping function that consider also the index
 */


function foldMapWithIndex_(fa, M, f) {
  return Chunk.reduce_(Chunk.zipWithIndex(fa), M.identity, (b, {
    tuple: [a, i]
  }) => M.combine(b, f(i, a)));
}
/**
 * Sort the elements of an array in increasing order
 *
 * @ets_data_first sort_
 */


function sort(O) {
  return as => sort_(as, O);
}
/**
 * Sort the elements of an array in increasing order
 */


function sort_(as, O) {
  return Chunk.from([...Chunk.toArray(as)].sort((x, y) => O.compare(x, y)));
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 *
 * @ets_data_first sortBy_
 */


function sortBy(ords) {
  return as => sortBy_(as, ords);
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 */


function sortBy_(as, ords) {
  const M = Ord.getIdentity();
  return sort_(as, ords.reduce((x, y) => M.combine(x, y), M.identity));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */


function union_(xs, E, ys) {
  return Chunk.concat_(xs, Chunk.filter_(ys, a => !elem_(xs, E, a)));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 *
 * @ets_data_first union_
 */


function union(E, ys) {
  return xs => union_(xs, E, ys);
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */


function uniq_(as, E) {
  let r = Chunk.empty();
  const len = as.length;
  let i = 0;

  for (; i < len; i++) {
    const a = Chunk.unsafeGet_(as, i);

    if (!elem_(r, E, a)) {
      r = Chunk.append_(r, a);
    }
  }

  return len === r.length ? as : r;
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @ets_data_first uniq_
 */


function uniq(E) {
  return as => uniq_(as, E);
}
/**
 * Separate elements based on a apredicate
 *
 * @ets_data_first partition_
 */


function partition(predicate) {
  return fa => partitionWithIndex((_, a) => predicate(a))(fa);
}
/**
 * Separate elements based on a apredicate
 */


function partition_(fa, predicate) {
  return partitionWithIndex((_, a) => predicate(a))(fa);
}
/**
 * Separate elements based on a map function that also carry the index
 */


function partitionMapWithIndex_(fa, f) {
  const left = [];
  const right = [];

  for (let i = 0; i < fa.length; i++) {
    const e = f(i, Chunk.unsafeGet_(fa, i));

    if (e._tag === "Left") {
      left.push(e.left);
    } else {
      right.push(e.right);
    }
  }

  return Tp.tuple(Chunk.from(left), Chunk.from(right));
}
/**
 * Separate elements based on a map function that also carry the index
 *
 * @ets_data_first partitionMapWithIndex_
 */


function partitionMapWithIndex(f) {
  return fa => partitionMapWithIndex_(fa, f);
}
/**
 * Separate elements based on a predicate that also carry the index
 *
 * @ets_data_first partitionWithIndex
 */


function partitionWithIndex(predicateWithIndex) {
  return fa => partitionWithIndex_(fa, predicateWithIndex);
}
/**
 * Separate elements based on a predicate that also carry the index
 */


function partitionWithIndex_(fa, predicateWithIndex) {
  const left = [];
  const right = [];

  for (let i = 0; i < fa.length; i++) {
    const a = Chunk.unsafeGet_(fa, i);

    if (predicateWithIndex(i, a)) {
      right.push(a);
    } else {
      left.push(a);
    }
  }

  return Tp.tuple(Chunk.from(left), Chunk.from(right));
}
//# sourceMappingURL=operations.js.map