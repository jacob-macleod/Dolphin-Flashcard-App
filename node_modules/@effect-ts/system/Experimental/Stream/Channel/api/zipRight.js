"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipRight = zipRight;
exports.zipRight_ = zipRight_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var Zip = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zip.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new channel that is the sequential composition of this channel and the specified
 * channel. The returned channel terminates with the terminal value of the other channel.
 */
function zipRight_(self, that) {
  return Map.map_(Zip.zip_(self, that), Tp.get(1));
}
/**
 * Returns a new channel that is the sequential composition of this channel and the specified
 * channel. The returned channel terminates with the terminal value of the other channel.
 *
 * @ets_data_first zipRight_
 */


function zipRight(that) {
  return self => zipRight_(self, that);
}
//# sourceMappingURL=zipRight.js.map