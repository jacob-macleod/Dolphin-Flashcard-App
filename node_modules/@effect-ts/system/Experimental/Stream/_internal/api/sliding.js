"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sliding = sliding;
exports.sliding_ = sliding_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var _index5 = /*#__PURE__*/require("../../../../Support/RingBufferNew/index.js");

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var Die = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./die.js"));

var SucceedWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./succeedWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Emits a sliding window of n elements.
 */
function sliding_(self, chunkSize, stepSize = 1) {
  if (chunkSize <= 0 || stepSize <= 0) {
    return Die.die(new CS.IllegalArgumentException("invalid bounds. `chunkSize` and `stepSize` must be greater than zero"));
  }

  return Chain.chain_(SucceedWith.succeedWith(() => new _index5.RingBufferNew(chunkSize)), queue => {
    const emitOnStreamEnd = (queueSize, channelEnd) => {
      if (queueSize < chunkSize) {
        const items = queue.toChunk();
        const result = CK.isEmpty(items) ? CK.empty() : CK.single(items);
        return CH.zipRight_(CH.write(result), channelEnd);
      } else {
        const lastEmitIndex = queueSize - (queueSize - chunkSize) % stepSize;

        if (lastEmitIndex === queueSize) {
          return channelEnd;
        } else {
          const leftovers = queueSize - (lastEmitIndex - chunkSize + stepSize);
          const lastItems = CK.takeRight_(queue.toChunk(), leftovers);
          const result = CK.isEmpty(lastItems) ? CK.empty() : CK.single(lastItems);
          return CH.zipRight_(CH.write(result), channelEnd);
        }
      }
    };

    const reader = queueSize => CH.readWithCause(in_ => CH.zipRight_(CH.write(CK.collect_(CK.zipWithIndex(in_), ({
      tuple: [i, idx]
    }) => {
      queue.put(i);
      const currentIndex = queueSize + idx + 1;

      if (currentIndex < chunkSize || (currentIndex - chunkSize) % stepSize > 0) {
        return O.none;
      } else {
        return O.some(queue.toChunk());
      }
    })), reader(queueSize + CK.size(in_))), cause => emitOnStreamEnd(queueSize, CH.failCause(cause)), _ => emitOnStreamEnd(queueSize, CH.unit));

    return new C.Stream(self.channel[">>>"](reader(0)));
  });
}
/**
 * Emits a sliding window of n elements.
 *
 * @ets_data_first sliding_
 */


function sliding(chunkSize, stepSize = 1) {
  return self => sliding_(self, chunkSize, stepSize);
}
//# sourceMappingURL=sliding.js.map