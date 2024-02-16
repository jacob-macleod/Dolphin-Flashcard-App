"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElse = orElse;
exports.orElse_ = orElse_;

var CatchAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchAll.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns a new channel that will perform the operations of this one, until failure, and then
 * it will switch over to the operations of the specified fallback channel.
 */
function orElse_(self, that) {
  return CatchAll.catchAll_(self, _ => that);
}
/**
 * Returns a new channel that will perform the operations of this one, until failure, and then
 * it will switch over to the operations of the specified fallback channel.
 *
 * @ets_data_first orElse_
 */


function orElse(that) {
  return self => orElse_(self, that);
}
//# sourceMappingURL=orElse.js.map