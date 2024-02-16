"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runForEach = runForEach;
exports.runForEach_ = runForEach_;

var SK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Sink/index.js"));

var Run = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./run.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
function runForEach_(self, f) {
  return Run.run_(self, SK.forEach(f));
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 *
 * @ets_data_first runForEach_
 */


function runForEach(f) {
  return self => runForEach_(self, f);
}
//# sourceMappingURL=runForEach.js.map