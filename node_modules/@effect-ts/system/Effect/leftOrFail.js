"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.left = left;
exports.leftOrFail = leftOrFail;
exports.leftOrFailException = leftOrFailException;
exports.leftOrFail_ = leftOrFail_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index2 = /*#__PURE__*/require("../GlobalExceptions/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _foldM = /*#__PURE__*/require("./foldM.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 */
function leftOrFail_(self, orFail, __trace) {
  return (0, _core.chain_)(self, E.fold(_core.succeed, x => (0, _fail.failWith)(() => orFail(x))), __trace);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 *
 * @ets_data_first leftOrFail_
 */


function leftOrFail(orFail, __trace) {
  return self => leftOrFail_(self, orFail, __trace);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with a `NoSuchElementException`.
 */


function leftOrFailException(self, __trace) {
  return leftOrFail_(self, () => new _index2.NoSuchElementException(), __trace);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error `None`.
 */


function left(self) {
  return (0, _foldM.foldM_)(self, e => (0, _fail.fail)(O.some(e)), E.fold(_core.succeed, () => (0, _fail.fail)(O.none)));
}
//# sourceMappingURL=leftOrFail.js.map