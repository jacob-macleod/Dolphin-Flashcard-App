"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.someOrFail = someOrFail;
exports.someOrFail_ = someOrFail_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */
function someOrFail(orFail, __trace) {
  return self => someOrFail_(self, orFail);
}
/**
 * Extracts the optional value, or fails with the given error 'e'.
 */


function someOrFail_(self, orFail, __trace) {
  return (0, _core.chain_)(self, O.fold(() => (0, _core.chain_)((0, _core.succeedWith)(orFail), _fail.fail), _core.succeed), __trace);
}
//# sourceMappingURL=someOrFail.js.map