"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.require = _require;
exports.require_ = require_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Requires that the given `Effect<R, E, Option<A>>` contain a value. If there is no
 * value, then the specified error will be raised.
 *
 * @ets_data_first require_
 */
function _require(error, __trace) {
  return io => require_(io, error, __trace);
}
/**
 * Requires that the given `Effect<R, E, Option<A>>` contain a value. If there is no
 * value, then the specified error will be raised.
 */


function require_(io, error, __trace) {
  return (0, _core.chain_)(io, O.fold(() => (0, _core.chain_)((0, _core.succeedWith)(error), _fail.fail), _core.succeed), __trace);
}
//# sourceMappingURL=require.js.map