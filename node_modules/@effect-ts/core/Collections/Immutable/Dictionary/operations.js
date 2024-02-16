"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  forEachWithIndexF: true,
  forEachF: true,
  foldMapWithIndex: true,
  foldMap: true,
  separateWithIndexF: true,
  separateF: true,
  compactWithIndexF: true,
  compactF: true,
  fromFoldableMap_: true,
  fromFoldableMap: true,
  fromFoldable: true,
  getShow: true,
  isSubrecord_: true,
  isSubrecord: true,
  getEqual: true,
  getIdentity: true
};
exports.forEachWithIndexF = exports.forEachF = exports.foldMapWithIndex = exports.foldMap = exports.compactWithIndexF = exports.compactF = void 0;
exports.fromFoldable = fromFoldable;
exports.fromFoldableMap = fromFoldableMap;
exports.fromFoldableMap_ = fromFoldableMap_;
exports.getEqual = getEqual;
exports.getIdentity = getIdentity;
exports.getShow = getShow;
exports.isSubrecord = isSubrecord;
exports.isSubrecord_ = isSubrecord_;
exports.separateWithIndexF = exports.separateF = void 0;

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Dictionary"));

Object.keys(R).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === R[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return R[key];
    }
  });
});

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Tuple"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Option"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Either/index.js"));

var _index2 = /*#__PURE__*/require("../../../Equal/index.js");

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var _index4 = /*#__PURE__*/require("../../../Identity/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Array/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Traverse Record with Applicative, passing index to f
 */
const forEachWithIndexF = /*#__PURE__*/P.implementForEachWithIndexF()(_ => G => {
  const succeed = (0, P.succeedF)(G);
  return f => fa => {
    let base = succeed({});

    for (const k of Object.keys(fa)) {
      base = G.map(({
        tuple: [x, b]
      }) => Object.assign(x, {
        [k]: b
      }))(G.both(f(k, fa[k]))(base));
    }

    return base;
  };
});
/**
 * Traverse Record with Applicative
 */

exports.forEachWithIndexF = forEachWithIndexF;
const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => forEachWithIndexF(G)((_, a) => f(a)));
/**
 * Fold + MapWithIndex
 */

exports.forEachF = forEachF;

const foldMapWithIndex = I => f => R.reduceWithIndex(I.identity, (k, b, a) => I.combine(b, f(k, a)));
/**
 * Fold + Map
 */


exports.foldMapWithIndex = foldMapWithIndex;

const foldMap = I => f => foldMapWithIndex(I)((_, a) => f(a));
/**
 * WiltWithIndex's separate
 */


exports.foldMap = foldMap;
const separateWithIndexF = /*#__PURE__*/P.implementSeparateWithIndexF()(() => G => f => x => G.map(({
  tuple: [left, right]
}) => Tp.tuple(R.fromArray(left), R.fromArray(right)))(A.separateF(G)(([k, a]) => G.map(E.bimap(b => Tp.tuple(k, b), a => Tp.tuple(k, a)))(f(k, a)))(R.collect(_index3.tuple)(x))));
/**
 * Wilt's separate
 */

exports.separateWithIndexF = separateWithIndexF;
const separateF = /*#__PURE__*/P.implementSeparateF()(() => G => f => separateWithIndexF(G)((_, a) => f(a)));
/**
 * WitherWithIndex's compactWithIndex
 */

exports.separateF = separateF;
const compactWithIndexF = /*#__PURE__*/P.implementCompactWithIndexF()(() => G => f => x => G.map(R.fromArray)(A.compactF(G)(([k, a]) => G.map(O.map(b => Tp.tuple(k, b)))(f(k, a)))(R.collect(_index3.tuple)(x))));
/**
 * Wither's compact
 */

exports.compactWithIndexF = compactWithIndexF;
const compactF = /*#__PURE__*/P.implementCompactF()(() => G => f => compactWithIndexF(G)((_, a) => f(a)));
exports.compactF = compactF;

function fromFoldableMap_(M, F) {
  return (fa, f) => {
    return F.reduce({}, (r, a) => {
      const [k, b] = f(a).tuple;
      r[k] = Object.prototype.hasOwnProperty.call(r, k) ? M.combine(r[k], b) : b;
      return r;
    })(fa);
  };
}

function fromFoldableMap(M, F) {
  const ff = fromFoldableMap_(M, F);
  return f => fa => ff(fa, f);
}

function fromFoldable(M, F) {
  const fromFoldableMapM = fromFoldableMap(M, F);
  return fromFoldableMapM(_index3.identity);
}
/**
 * Get Show of Record given Show of values
 */


function getShow(S) {
  return {
    show: r => {
      const elements = R.collect((k, a) => `${JSON.stringify(k)}: ${S.show(a)}`)(r).join(", ");
      return elements === "" ? "{}" : `{ ${elements} }`;
    }
  };
}
/**
 * Test whether one record contains all of the keys and values contained in another record
 */


function isSubrecord_(E) {
  return (x, y) => {
    for (const k in x) {
      if (!Object.prototype.hasOwnProperty.call(y, k) || !E.equals(x[k], y[k])) {
        return false;
      }
    }

    return true;
  };
}
/**
 * Test whether one record contains all of the keys and values contained in another record
 */


function isSubrecord(E) {
  const is = isSubrecord_(E);
  return y => x => is(x, y);
}
/**
 * Get Equals for record given Equals of values
 */


function getEqual(E) {
  const isSubrecordE = isSubrecord_(E);
  return (0, _index2.makeEqual)((x, y) => isSubrecordE(x, y) && isSubrecordE(y, x));
}
/**
 * Returns a `Identity` instance for records given a `Associative` instance for their values
 */


function getIdentity(S) {
  return (0, _index4.makeIdentity)(R.empty, (x, y) => {
    if (x === R.empty) {
      return y;
    }

    if (y === R.empty) {
      return x;
    }

    const keys = Object.keys(y);
    const len = keys.length;

    if (len === 0) {
      return x;
    }

    const r = { ...x
    };

    for (let i = 0; i < len; i++) {
      const k = keys[i];
      r[k] = Object.prototype.hasOwnProperty.call(x, k) ? S.combine(x[k], y[k]) : y[k];
    }

    return r;
  });
}
//# sourceMappingURL=operations.js.map