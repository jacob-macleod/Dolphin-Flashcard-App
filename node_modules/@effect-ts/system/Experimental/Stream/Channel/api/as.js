"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.as = as;
exports.as_ = as_;

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns a new channel that is the same as this one, except the terminal value of the channel
 * is the specified constant value.
 *
 * This method produces the same result as mapping this channel to the specified constant value.
 */
function as_(self, z2) {
  return Map.map_(self, _ => z2);
}
/**
 * Returns a new channel that is the same as this one, except the terminal value of the channel
 * is the specified constant value.
 *
 * This method produces the same result as mapping this channel to the specified constant value.
 *
 * @ets_data_first as_
 */


function as(z2) {
  return self => as_(self, z2);
}
//# sourceMappingURL=as.js.map