"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Attempted = void 0;
exports.forEachUnit = forEachUnit;
exports.forEachUnit_ = forEachUnit_;
exports.isFailure = isFailure;
exports.toManaged = toManaged;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Attempted {
  constructor(result, finalizer) {
    this.result = result;
    this.finalizer = finalizer;
  }

}

exports.Attempted = Attempted;
T._E, T._A;

function isFailure(self) {
  return self.result._tag === "Failure";
}

function forEachUnit_(self, f) {
  return Ex.foldM_(self.result, _ => T.unit, a => f(a));
}

function forEachUnit(f) {
  return self => forEachUnit_(self, f);
}

function toManaged(self) {
  return T.toManaged(T.done(self.result));
}
//# sourceMappingURL=Attempted.js.map