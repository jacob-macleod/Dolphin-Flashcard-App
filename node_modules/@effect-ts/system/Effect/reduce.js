"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reduceRight_ = reduceRight_;
exports.reduce_ = reduce_;

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Iterable/index.js"));

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */
function reduce_(i, zero, f, __trace) {
  return (0, _core.suspend)(() => I.reduce_(i, (0, _core.succeed)(zero), (acc, el) => (0, _core.chain_)(acc, a => f(a, el))), __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduce_
 */


function reduce(zero, f, __trace) {
  return i => reduce_(i, zero, f, __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 */


function reduceRight_(i, zero, f, __trace) {
  return (0, _core.suspend)(() => I.reduceRight_(i, (0, _core.succeed)(zero), (el, acc) => (0, _core.chain_)(acc, a => f(el, a))), __trace);
}
/**
 * Folds an Iterable[A] using an effectual function f, working sequentially from left to right.
 *
 * @ets_data_first reduceRight_
 */


function reduceRight(zero, f, __trace) {
  return i => reduceRight_(i, zero, f, __trace);
}
//# sourceMappingURL=reduce.js.map