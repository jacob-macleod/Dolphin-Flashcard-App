"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduceRight = exports.Reduce = exports.Monad = exports.IdentityFlatten = exports.IdentityBoth = exports.ForEach = exports.Foldable = exports.FoldMap = exports.Covariant = exports.AssociativeFlatten = exports.AssociativeBoth = exports.Applicative = exports.Any = void 0;
exports.alt = alt;
exports.alt_ = alt_;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apSecond = apSecond;
exports.ap_ = ap_;
exports.chain = chain;
exports.chain_ = chain_;
exports.duplicate = duplicate;
exports.extend = extend;
exports.extend_ = extend_;
exports.extract = extract;
exports.flatten = flatten;
exports.foldMap = foldMap;
exports.foldMap_ = foldMap_;
exports.getEq = getEq;
exports.getShow = getShow;
exports.map = map;
exports.map_ = map_;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reduceRight_ = reduceRight_;
exports.reduce_ = reduce_;
exports.struct = void 0;
exports.tap = tap;
exports.tap_ = tap_;
exports.tuple = void 0;

require("../Operator/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Tuple"));

var _index2 = /*#__PURE__*/require("../Prelude/DSL/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */

/**
 * @ets_optimize identity
 */
function alt_(fx, _fy) {
  return fx;
}
/**
 * @ets_data_first alt_
 */


function alt(that) {
  return fa => alt_(fa, that);
}

function ap_(fab, fa) {
  return fab(fa);
}
/**
 * @ets_data_first ap_
 */


function ap(fa) {
  return fab => ap_(fab, fa);
}

function apFirst(_fb) {
  return fa => fa;
}

function apSecond(fb) {
  return _fa => fb;
}

function chain_(fa, f) {
  return f(fa);
}
/**
 * @ets_data_first chain_
 */


function chain(f) {
  return ma => f(ma);
}
/**
 * @ets_data_first tap_
 */


function tap(f) {
  return ma => chain_(ma, x => map_(f(x), () => x));
}

function tap_(ma, f) {
  return chain_(ma, x => map_(f(x), () => x));
}
/**
 * @ets_optimize identity
 */


function duplicate(ma) {
  return ma;
}

function extend_(wa, f) {
  return f(wa);
}
/**
 * @ets_data_first extend_
 */


function extend(f) {
  return ma => f(ma);
}
/**
 * @ets_optimize identity
 */


function extract(wa) {
  return wa;
}
/**
 * @ets_optimize identity
 */


function flatten(wa) {
  return wa;
}

function foldMap_(M) {
  return (fa, f) => f(fa);
}

function foldMap(M) {
  return f => fa => foldMap_(M)(fa, f);
}
/**
 * @ets_optimize identity
 */


function getEq(E) {
  return E;
}
/**
 * @ets_optimize identity
 */


function getShow(E) {
  return E;
}

function map_(fa, f) {
  return f(fa);
}
/**
 * @ets_data_first map_
 */


function map(f) {
  return fa => map_(fa, f);
}

function reduce_(fa, b, f) {
  return f(b, fa);
}
/**
 * @ets_data_first reduce_
 */


function reduce(b, f) {
  return fa => reduce_(fa, b, f);
}

function reduceRight_(fa, b, f) {
  return f(fa, b);
}
/**
 * @ets_data_first reduceRight_
 */


function reduceRight(b, f) {
  return fa => reduceRight_(fa, b, f);
}

const Any = {
  any: () => ({})
};
exports.Any = Any;
const Covariant = {
  map
};
exports.Covariant = Covariant;
const AssociativeBoth = {
  both: b => a => Tp.tuple(a, b)
};
exports.AssociativeBoth = AssociativeBoth;
const AssociativeFlatten = {
  flatten: a => a
};
exports.AssociativeFlatten = AssociativeFlatten;
const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
exports.IdentityBoth = IdentityBoth;
const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
exports.IdentityFlatten = IdentityFlatten;
const Applicative = { ...Covariant,
  ...IdentityBoth
};
exports.Applicative = Applicative;
const Monad = { ...Covariant,
  ...IdentityFlatten
};
exports.Monad = Monad;
const Reduce = {
  reduce
};
exports.Reduce = Reduce;
const ReduceRight = {
  reduceRight
};
exports.ReduceRight = ReduceRight;
const FoldMap = {
  foldMap
};
exports.FoldMap = FoldMap;
const Foldable = { ...Reduce,
  ...ReduceRight,
  ...FoldMap
};
exports.Foldable = Foldable;
const ForEach = { ...Covariant,
  forEachF: () => f => f
};
exports.ForEach = ForEach;
const struct = /*#__PURE__*/(0, _index2.structF)(Applicative);
exports.struct = struct;
const tuple = /*#__PURE__*/(0, _index2.tupleF)(Applicative);
exports.tuple = tuple;
//# sourceMappingURL=index.js.map