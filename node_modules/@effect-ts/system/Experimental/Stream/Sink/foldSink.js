"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foldSink = foldSink;
exports.foldSink_ = foldSink_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var AR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Support/AtomicReference/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function foldSink_(self, failure, success) {
  return new C.Sink(CH.foldChannel_(CH.doneCollect(self.channel), _ => failure(_).channel, ({
    tuple: [leftovers, z]
  }) => CH.suspend(() => {
    const leftoversRef = new AR.AtomicReference(CK.filter_(leftovers, a => !CK.isEmpty(a)));
    const refReader = CH.chain_(CH.succeedWith(() => leftoversRef.getAndSet(CK.empty())), chunk => CH.writeChunk(chunk));
    const passthrough = CH.identity();
    const continationSink = CH.zipRight_(refReader, passthrough)[">>>"](success(z).channel);
    return CH.chain_(CH.doneCollect(continationSink), ({
      tuple: [newLeftovers, z1]
    }) => CH.zipRight_(CH.chain_(CH.succeedWith(() => leftoversRef.get), _ => CH.writeChunk(_)), CH.as_(CH.writeChunk(newLeftovers), z1)));
  })));
}
/**
 *
 * @ets_data_first foldSink_
 */


function foldSink(failure, success) {
  return self => foldSink_(self, failure, success);
}
//# sourceMappingURL=foldSink.js.map