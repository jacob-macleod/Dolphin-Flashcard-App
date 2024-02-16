"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doneCollect = doneCollect;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var ReadWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./readWith.js"));

var ZipRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipRight.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function doneCollectReader(builder) {
  return ReadWith.readWith(out => ZipRight.zipRight_(C.succeedWith(() => {
    builder.append(out);
  }), doneCollectReader(builder)), err => C.fail(err), done => C.end(done));
}
/**
 * Returns a new channel, which is the same as this one, except that all the outputs are
 * collected and bundled into a tuple together with the terminal value of this channel.
 *
 * As the channel returned from this channel collect's all of this channel's output into an in-
 * memory chunk, it is not safe to call this method on channels that output a large or unbounded
 * number of values.
 */


function doneCollect(self) {
  return C.suspend(() => {
    const builder = CK.builder();
    return C.chain_(C.pipeTo_(self, doneCollectReader(builder)), z => C.succeedWith(() => Tp.tuple(builder.build(), z)));
  });
}
//# sourceMappingURL=doneCollect.js.map