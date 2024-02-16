"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loopOnPartialChunksElements = loopOnPartialChunksElements;
exports.loopOnPartialChunksElements_ = loopOnPartialChunksElements_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var LoopOnPartialChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./loopOnPartialChunks.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Loops on chunks elements emitting partially
 */
function loopOnPartialChunksElements_(self, f) {
  return LoopOnPartialChunks.loopOnPartialChunks_(self, (a, emit) => T.as_(T.forEachUnit_(a, a => f(a, emit)), true));
}
/**
 * Loops on chunks elements emitting partially
 *
 * @ets_data_first loopOnPartialChunksElements_
 */


function loopOnPartialChunksElements(f) {
  return self => loopOnPartialChunksElements_(self, f);
}
//# sourceMappingURL=loopOnPartialChunksElements.js.map