"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoolAlgebraM = void 0;
exports.and = and;
exports.and_ = and_;
exports.as = as;
exports.as_ = as_;
exports.chain = chain;
exports.chain_ = chain_;
exports.failure = failure;
exports.fromEffect = fromEffect;
exports.iff = iff;
exports.iff_ = iff_;
exports.implies = implies;
exports.implies_ = implies_;
exports.isSuccess = isSuccess;
exports.map_ = map_;
exports.not = not;
exports.or = or;
exports.or_ = or_;
exports.success = success;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var BA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebra/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class BoolAlgebraM {
  constructor(run) {
    this.run = run;
  }

}

exports.BoolAlgebraM = BoolAlgebraM;
T._R, T._E, T._A;

function and_(self, that) {
  return new BoolAlgebraM(T.zipWith_(self.run, that.run, BA.and_));
}

function and(that) {
  return self => and_(self, that);
}

function or_(self, that) {
  return new BoolAlgebraM(T.zipWith_(self.run, that.run, BA.or_));
}

function or(that) {
  return self => or_(self, that);
}

function implies_(self, that) {
  return new BoolAlgebraM(T.zipWith_(self.run, that.run, BA.implies_));
}

function implies(that) {
  return self => implies_(self, that);
}

function iff_(self, that) {
  return new BoolAlgebraM(T.zipWith_(self.run, that.run, BA.iff_));
}

function iff(that) {
  return self => iff_(self, that);
}

function not(self) {
  return new BoolAlgebraM(T.map_(self.run, BA.not));
}

function as_(self, b) {
  return map_(self, _ => b);
}

function as(b) {
  return self => as_(self, b);
}

function chain_(self, f) {
  return new BoolAlgebraM(T.chain_(self.run, BA.chainM(_ => f(_).run)));
}

function chain(f) {
  return self => chain_(self, f);
}

function isSuccess(self) {
  return T.map_(self.run, BA.isSuccess);
}

function map_(self, f) {
  return chain_(self, (0, _index2.flow)(f, success));
}

function failure(a) {
  return new BoolAlgebraM(T.succeed(BA.failure(a)));
}

function fromEffect(effect) {
  return new BoolAlgebraM(T.map_(effect, BA.success));
}

function success(a) {
  return new BoolAlgebraM(T.succeed(BA.success(a)));
}
//# sourceMappingURL=index.js.map