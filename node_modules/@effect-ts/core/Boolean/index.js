"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SumIdentity = exports.SumClosure = exports.ProdIdentity = exports.ProdClosure = exports.Equal = exports.DisjunctionIdentity = exports.DisjunctionClosure = exports.ConjunctionIdentity = exports.ConjunctionClosure = void 0;
exports.allPass = allPass;
exports.allPass_ = allPass_;
exports.and = and;
exports.andPass = andPass;
exports.andPass_ = andPass_;
exports.and_ = and_;
exports.anyPass = anyPass;
exports.anyPass_ = anyPass_;
exports.fold = fold;
exports.invert = invert;
exports.not = not;
exports.or = or;
exports.orPass = orPass;
exports.orPass_ = orPass_;
exports.or_ = or_;
exports.xor = xor;
exports.xor_ = xor_;

require("../Operator/index.js");

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Closure/index.js"));

var Eq = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Equal/index.js"));

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Identity/index.js"));

var _index5 = /*#__PURE__*/require("../Newtype/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const ConjunctionClosure = /*#__PURE__*/C.makeClosure((l, r) => l && r);
exports.ConjunctionClosure = ConjunctionClosure;
const DisjunctionClosure = /*#__PURE__*/C.makeClosure((l, r) => l || r);
exports.DisjunctionClosure = DisjunctionClosure;
const ProdClosure = /*#__PURE__*/C.makeClosure((l, r) => l && r);
exports.ProdClosure = ProdClosure;
const SumClosure = /*#__PURE__*/C.makeClosure((l, r) => l || r);
exports.SumClosure = SumClosure;
const ConjunctionIdentity = /*#__PURE__*/I.makeIdentity(true, ConjunctionClosure.combine);
exports.ConjunctionIdentity = ConjunctionIdentity;
const DisjunctionIdentity = /*#__PURE__*/I.makeIdentity(false, DisjunctionClosure.combine);
exports.DisjunctionIdentity = DisjunctionIdentity;
const ProdIdentity = /*#__PURE__*/I.makeIdentity(false, ProdClosure.combine);
exports.ProdIdentity = ProdIdentity;
const SumIdentity = /*#__PURE__*/I.makeIdentity(false, SumClosure.combine);
exports.SumIdentity = SumIdentity;
const Equal = /*#__PURE__*/Eq.strict();
exports.Equal = Equal;

function fold(onFalse, onTrue) {
  return value => value ? onTrue() : onFalse();
}

function not(a) {
  return !a;
}

function invert(b) {
  return !b;
}

function and_(x, y) {
  return x && y;
}

function and(y) {
  return x => x && y;
}

function or_(x, y) {
  return x || y;
}

function or(y) {
  return x => x || y;
}

function xor_(x, y) {
  return x && !y || !x && y;
}

function xor(y) {
  return x => x && !y || !x && y;
}

function allPass_(a, ps) {
  return ps.every(f => f(a));
}

function allPass(ps) {
  return a => ps.every(f => f(a));
}

function anyPass_(a, ps) {
  return ps.some(f => f(a));
}

function anyPass(ps) {
  return a => ps.some(f => f(a));
}

function andPass_(f, g) {
  return a => and_(f(a), g(a));
}

function andPass(g) {
  return f => andPass_(f, g);
}

function orPass_(f, g) {
  return a => or_(f(a), g(a));
}

function orPass(g) {
  return f => orPass_(f, g);
}
//# sourceMappingURL=index.js.map