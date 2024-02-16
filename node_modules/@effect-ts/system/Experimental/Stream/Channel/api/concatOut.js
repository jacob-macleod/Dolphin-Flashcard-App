"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatOut = concatOut;

var ConcatAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./concatAll.js"));

var MapOut = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapOut.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns a new channel, which is the concatenation of all the channels that are written out by
 * this channel. This method may only be called on channels that output other channels.
 */
function concatOut(self) {
  return ConcatAll.concatAll(MapOut.mapOut_(self, out => out));
}
//# sourceMappingURL=concatOut.js.map