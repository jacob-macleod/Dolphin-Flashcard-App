"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromQueue = fromQueue;
exports.fromQueue_ = fromQueue_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../../../../Function/index.js");

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Pull/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var RepeatEffectChunkOption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./repeatEffectChunkOption.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a stream from a `XQueue` of values
 */
function fromQueue_(queue, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return RepeatEffectChunkOption.repeatEffectChunkOption(T.catchAllCause_(T.map_(Q.takeBetween_(queue, 1, maxChunkSize), CK.from), c => T.chain_(Q.isShutdown(queue), down => {
    if (down && CS.interrupted(c)) {
      return Pull.end;
    } else {
      return Pull.failCause(c);
    }
  })));
}
/**
 * Creates a stream from a `XQueue` of values
 */


function fromQueue(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return queue => fromQueue_(queue, maxChunkSize);
}
//# sourceMappingURL=fromQueue.js.map