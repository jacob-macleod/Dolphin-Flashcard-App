"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Covariant = exports.Contravariant = void 0;
exports.bimap = bimap;
exports.bimap_ = bimap_;
exports.contramap = contramap;
exports.contramap_ = void 0;
exports.getAny = getAny;
exports.getApplicative = getApplicative;
exports.getAssociative = getAssociative;
exports.getAssociativeBoth = getAssociativeBoth;
exports.getBounded = getBounded;
exports.getEqual = getEqual;
exports.getIdentity = getIdentity;
exports.getIdentityBoth = getIdentityBoth;
exports.getOrd = getOrd;
exports.getShow = getShow;
exports.makeConst = void 0;
exports.map = map;
exports.mapLeft = mapLeft;
exports.map_ = exports.mapLeft_ = void 0;

require("../Operator/index.js");

var _index2 = /*#__PURE__*/require("../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

var _index4 = /*#__PURE__*/require("../Show/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Map + MapLeft
 */
function bimap_(fea, f, g) {
  return makeConst(f(fea))();
}
/**
 * Map + MapLeft
 */


function bimap(f, g) {
  return fa => bimap_(fa, f, g);
}
/**
 * Contramap input
 */


const contramap_ = _index2.unsafeCoerce;
/**
 * Contramap input
 */

exports.contramap_ = contramap_;

function contramap(f) {
  return fa => contramap_(fa, f);
}
/**
 * The `Any` instance for `Const[E, +_]`
 */


function getAny(e) {
  return {
    any: makeConst(e)
  };
}
/**
 * The `AssociativeBoth` instance for `Const[E, +_]`
 */


function getAssociativeBoth(A) {
  return {
    both: fb => fa => makeConst(A.combine(fa, fb))()
  };
}
/**
 * The `Contravariant` instance for `Const[+_, +_]`
 */


const Contravariant = {
  contramap
};
/**
 * The `Covariant` instance for `Const[E, +_]`
 */

exports.Contravariant = Contravariant;
const Covariant = {
  map
};
/**
 * The `IdentityBoth` instance for `Const[E, +_]`
 */

exports.Covariant = Covariant;

function getIdentityBoth(I) {
  return { ...getAny(I.identity),
    ...getAssociativeBoth(I)
  };
}
/**
 * The `Applicative` instance for `Const[E, +_]`
 */


function getApplicative(I) {
  return { ...Covariant,
    ...getIdentityBoth(I)
  };
}
/**
 * The `Show` instance for `Const[E, +_]`
 */


function getShow(S) {
  return () => (0, _index4.makeShow)(c => `make(${S.show(c)})`);
}
/**
 * The `Bounded` instance for `Const[E, +_]`
 */


function getBounded(B) {
  return () => B;
}
/**
 * The `Equal` instance for `Const[E, +_]`
 */


function getEqual(E) {
  return () => E;
}
/**
 * The `Identity` instance for `Const[E, +_]`
 */


function getIdentity(I) {
  return () => I;
}
/**
 * The `Ord` instance for `Const[E, +_]`
 */


function getOrd(O) {
  return () => O;
}
/**
 * The `Associative` instance for `Const[E, +_]`
 */


function getAssociative(A) {
  return () => A;
}
/**
 * Construct `Const[E, A]`
 */


const makeConst = e => () => e;
/**
 * Maps `Const[E, A]` to `Const[E, B]` via `f : A => B`
 *
 * @ets_optimize identity
 */


exports.makeConst = makeConst;
const map_ = _index2.unsafeCoerce;
/**
 * Maps `Const[E, A]` to `Const[E, B]` via `f : A => B`
 */

exports.map_ = map_;

function map(f) {
  return fa => map_(fa, f);
}
/**
 * Maps `Const[E, A]` to `Const[E1, A]` via `f : E => E1`
 */


const mapLeft_ = (fea, f) => makeConst(f(fea))();
/**
 * Maps `Const[E, A]` to `Const[E1, A]` via `f : E => E1`
 */


exports.mapLeft_ = mapLeft_;

function mapLeft(f) {
  return fa => mapLeft_(fa, f);
}
//# sourceMappingURL=index.js.map