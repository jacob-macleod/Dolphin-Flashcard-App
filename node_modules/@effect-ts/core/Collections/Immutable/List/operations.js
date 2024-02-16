"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  forEachF: true,
  sortBy: true,
  sortBy_: true,
  separateF: true,
  compactF: true,
  elem: true,
  elem_: true,
  difference_: true,
  difference: true,
  getEqual: true,
  getIdentity: true,
  getShow: true,
  intersection_: true,
  intersection: true,
  foldMap_: true,
  foldMap: true,
  union_: true,
  union: true,
  uniq: true
};
exports.compactF = void 0;
exports.difference = difference;
exports.difference_ = difference_;
exports.elem = elem;
exports.elem_ = elem_;
exports.foldMap = foldMap;
exports.foldMap_ = foldMap_;
exports.forEachF = void 0;
exports.getEqual = getEqual;
exports.getIdentity = getIdentity;
exports.getShow = getShow;
exports.intersection = intersection;
exports.intersection_ = intersection_;
exports.separateF = void 0;
exports.sortBy = sortBy;
exports.sortBy_ = sortBy_;
exports.union = union;
exports.union_ = union_;
exports.uniq = uniq;

var List = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/List"));

Object.keys(List).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === List[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return List[key];
    }
  });
});

var _index = /*#__PURE__*/require("../../../Equal/index.js");

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var _index3 = /*#__PURE__*/require("../../../Identity/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Array/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * `ForEach`'s `forEachF` function
 */
const forEachF = /*#__PURE__*/P.implementForEachF()(() => G => f => fa => List.reduceRight_(fa, P.succeedF(G)(List.empty()), (a, acc) => G.map(({
  tuple: [b, l]
}) => List.prepend_(l, b))(G.both(acc)(f(a)))));
/**
 * Sort the given list by passing each value through the function and
 * comparing the resulting value.
 *
 * Performs a stable sort.
 *
 * @complexity O(n * log(n))
 */

exports.forEachF = forEachF;

function sortBy(O) {
  const so = sortBy_(O);
  return f => l => so(l, f);
}
/**
 * Sort the given list by passing each value through the function and
 * comparing the resulting value.
 *
 * Performs a stable sort.
 *
 * @complexity O(n * log(n))
 */


function sortBy_(O) {
  return (l, f) => {
    if (l.length === 0) {
      return l;
    }

    const arr = [];
    let i = 0;
    List.forEach_(l, elm => arr.push({
      idx: i++,
      elm,
      prop: f(elm)
    }));
    arr.sort(({
      idx: i,
      prop: a
    }, {
      idx: j,
      prop: b
    }) => {
      const c = O.compare(a, b);
      return c !== 0 ? c : i < j ? -1 : 1;
    });
    const newL = List.emptyPushable();

    for (let i = 0; i < arr.length; ++i) {
      List.push_(newL, arr[i].elm);
    }

    return newL;
  };
}
/**
 * `Wiltable`'s `separateF` function
 */


const separateF = /*#__PURE__*/P.implementSeparateF()(_ => G => f => x => G.map(List.separate)(forEachF(G)(f)(x)));
/**
 * `Wither`'s `compactF` function
 */

exports.separateF = separateF;
const compactF = /*#__PURE__*/P.implementCompactF()(_ => G => f => x => G.map(List.compact)(forEachF(G)(f)(x)));
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 */

exports.compactF = compactF;

function elem(E) {
  const elemE = elem_(E);
  return a => as => elemE(as, a);
}
/**
 * Test if a value is a member of a list. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an list of type `List<A>`.
 */


function elem_(E) {
  return (as, a) => List.find_(as, y => E.equals(y, a))._tag === "Some";
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function difference_(E) {
  const elemE = elem_(E);
  return (xs, ys) => List.filter_(xs, a => !elemE(ys, a));
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function difference(E) {
  const diff = difference_(E);
  return ys => xs => diff(xs, ys);
}
/**
 * Derives an `Equal` over the `Array` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */


function getEqual(E) {
  const eq = A.getEqual(E);
  return (0, _index.makeEqual)((xs, ys) => xs === ys || xs.length === ys.length && eq.equals(List.toArray(xs), List.toArray(ys)));
}
/**
 * Returns a `Identity` for `List<A>`
 */


function getIdentity() {
  return (0, _index3.makeIdentity)(List.empty(), List.concat_);
}
/**
 * Returns a `Show` for `Array<A>` given `Show<A>`
 */


function getShow(S) {
  return {
    show: as => `[${List.join_(List.map_(as, S.show), ", ")}]`
  };
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first list.
 */


function intersection_(E) {
  const elemE = elem_(E);
  return (xs, ys) => List.filter_(xs, a => elemE(ys, a));
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function intersection(E) {
  const int = intersection_(E);
  return ys => xs => int(xs, ys);
}
/**
 * Fold Identity with a mapping function that consider also the index
 */


function foldMap_(M) {
  return (fa, f) => List.reduce_(fa, M.identity, (b, a) => M.combine(b, f(a)));
}
/**
 * Fold Identity with a mapping function that consider also the index
 */


function foldMap(M) {
  const fmap = foldMap_(M);
  return f => fa => fmap(fa, f);
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */


function union_(E) {
  const elemE = elem_(E);
  return (xs, ys) => List.concat_(xs, List.filter_(ys, a => !elemE(xs, a)));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */


function union(E) {
  const un = union_(E);
  return ys => xs => un(xs, ys);
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */


function uniq(E) {
  const elemS = elem_(E);
  return as => List.reduce_(as, List.emptyPushable(), (acc, a) => {
    if (!elemS(acc, a)) {
      List.push_(acc, a);
    }

    return acc;
  });
}
//# sourceMappingURL=operations.js.map