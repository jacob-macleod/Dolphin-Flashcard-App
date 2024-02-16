"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.branchAfter = branchAfter;
exports.branchAfter_ = branchAfter_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Empty = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./empty.js"));

var FromChunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromChunk.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Reads the first n values from the stream and uses them to choose the pipeline that will be
 * used for the remainder of the stream.
 */
function branchAfter_(self, n, f) {
  const collecting = buf => CH.readWithCause(chunk => {
    const newBuf = CK.concat_(buf, chunk);

    if (CK.size(newBuf) >= n) {
      const {
        tuple: [is, is1]
      } = CK.splitAt_(newBuf, n);
      const pipeline = f(is);
      return CH.zipRight_(pipeline(FromChunk.fromChunk(is1)).channel, emitting(pipeline));
    } else {
      return collecting(newBuf);
    }
  }, _ => CH.failCause(_), _ => {
    if (CK.isEmpty(buf)) {
      return CH.unit;
    } else {
      const pipeline = f(buf);
      return pipeline(Empty.empty).channel;
    }
  });

  const emitting = pipeline => CH.readWithCause(chunk => CH.zipRight_(pipeline(FromChunk.fromChunk(chunk)).channel, emitting(pipeline)), _ => CH.failCause(_), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](collecting(CK.empty())));
}
/**
 * Reads the first n values from the stream and uses them to choose the pipeline that will be
 * used for the remainder of the stream.
 *
 * @ets_data_first branchAfter_
 */


function branchAfter(n, f) {
  return self => branchAfter_(self, n, f);
}
//# sourceMappingURL=branchAfter.js.map