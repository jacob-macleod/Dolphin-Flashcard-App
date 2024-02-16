"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refineOrDie = refineOrDie;
exports.refineOrDieWith = refineOrDieWith;
exports.refineOrDieWith_ = refineOrDieWith_;
exports.refineOrDie_ = refineOrDie_;

var _index = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _catchAll = /*#__PURE__*/require("./catchAll.js");

var _die = /*#__PURE__*/require("./die.js");

var _fail = /*#__PURE__*/require("./fail.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 *
 * @ets_data_first refineOrDieWith_
 */
function refineOrDieWith(pf, f, __trace) {
  return self => refineOrDieWith_(self, pf, f, __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest, using
 * the specified function to convert the `E` into a `Throwable`.
 */


function refineOrDieWith_(self, pf, f, __trace) {
  return (0, _catchAll.catchAll_)(self, e => O.fold_(pf(e), () => (0, _die.die)(f(e)), e1 => (0, _fail.fail)(e1)), __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 *
 * @ets_data_first refineOrDie_
 */


function refineOrDie(pf, __trace) {
  return self => refineOrDie_(self, pf, __trace);
}
/**
 * Keeps some of the errors, and terminates the fiber with the rest
 */


function refineOrDie_(self, pf, __trace) {
  return refineOrDieWith_(self, pf, _index.identity, __trace);
}
//# sourceMappingURL=refineOrDie.js.map