"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithPreviousAndNext = zipWithPreviousAndNext;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var ZipWithNext = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipWithNext.js"));

var ZipWithPrevious = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipWithPrevious.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips each element with both the previous and next element.
 */
function zipWithPreviousAndNext(self) {
  return Map.map_(ZipWithNext.zipWithNext(ZipWithPrevious.zipWithPrevious(self)), ({
    tuple: [{
      tuple: [prev, curr]
    }, next]
  }) => Tp.tuple(prev, curr, O.map_(next, Tp.get(1))));
}
//# sourceMappingURL=zipWithPreviousAndNext.js.map