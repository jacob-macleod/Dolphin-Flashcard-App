"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runForEachChunk = runForEachChunk;
exports.runForEachChunk_ = runForEachChunk_;

var SK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Sink/index.js"));

var Run = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./run.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
function runForEachChunk_(self, f) {
  return Run.run_(self, SK.forEachChunk(f));
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 *
 * @ets_data_first runForEachChunk_
 */


function runForEachChunk(f) {
  return self => runForEachChunk_(self, f);
}
//# sourceMappingURL=runForEachChunk.js.map