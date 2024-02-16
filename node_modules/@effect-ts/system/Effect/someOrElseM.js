"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.someOrElseM = someOrElseM;
exports.someOrElseM_ = someOrElseM_;

var _index = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Extracts the optional value, or executes the effect 'orElse'.
 *
 * @ets_data_first someOrElseM_
 */
function someOrElseM(orElse, __trace) {
  return self => someOrElseM_(self, orElse, __trace);
}
/**
 * Extracts the optional value, or executes the effect 'orElse'.
 */


function someOrElseM_(self, orElse, __trace) {
  return (0, _core.chain_)(self, x => O.getOrElse_(O.map_(x, _core.succeed), (0, _index.constant)(orElse)), __trace);
}
//# sourceMappingURL=someOrElseM.js.map