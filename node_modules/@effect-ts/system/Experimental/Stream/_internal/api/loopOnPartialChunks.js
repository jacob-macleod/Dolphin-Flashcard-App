"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loopOnPartialChunks = loopOnPartialChunks;
exports.loopOnPartialChunks_ = loopOnPartialChunks_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var LoopOnChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./loopOnChunks.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Loops on chunks emitting partially
 */
function loopOnPartialChunks_(self, f) {
  return LoopOnChunks.loopOnChunks_(self, chunk => CH.unwrap(T.suspend(() => {
    const outputChunk = CK.builder();

    const emit = a => T.succeedWith(() => {
      outputChunk.append(a);
    });

    return T.catchAll_(T.map_(f(chunk, emit), cont => CH.chain_(CH.write(outputChunk.build()), () => CH.end(cont))), failure => T.succeedWith(() => {
      const partialResult = outputChunk.build();

      if (CK.isEmpty(partialResult)) {
        return CH.fail(failure);
      } else {
        return CH.zipRight_(CH.write(partialResult), CH.fail(failure));
      }
    }));
  })));
}
/**
 * Loops on chunks emitting partially
 *
 * @ets_data_first loopOnPartialChunks_
 */


function loopOnPartialChunks(f) {
  return self => loopOnPartialChunks_(self, f);
}
//# sourceMappingURL=loopOnPartialChunks.js.map