"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapErrorCause = mapErrorCause;
exports.mapErrorCause_ = mapErrorCause_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * A more powerful version of `mapError` which also surfaces the `Cause` of the channel failure
 */
function mapErrorCause_(self, f) {
  return C.catchAllCause_(self, cause => C.failCause(f(cause)));
}
/**
 * A more powerful version of `mapError` which also surfaces the `Cause` of the channel failure
 *
 * @ets_data_first mapErrorCause_
 */


function mapErrorCause(f) {
  return self => mapErrorCause_(self, f);
}
//# sourceMappingURL=mapErrorCause.js.map