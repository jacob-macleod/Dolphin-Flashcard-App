"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferChunksDropping = bufferChunksDropping;
exports.bufferChunksDropping_ = bufferChunksDropping_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var BufferSignal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/bufferSignal.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a dropping queue.
 */
function bufferChunksDropping_(self, capacity) {
  const queue = T.toManagedRelease_(Q.makeDropping(capacity), Q.shutdown);
  return new C.Stream(BufferSignal.bufferSignal(queue, self.channel));
}
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * up to `capacity` chunks in a dropping queue.
 *
 * @ets_data_first bufferChunksDropping_
 */


function bufferChunksDropping(capacity) {
  return self => bufferChunksDropping_(self, capacity);
}
//# sourceMappingURL=bufferChunksDropping.js.map