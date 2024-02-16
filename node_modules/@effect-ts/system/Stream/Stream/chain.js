"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain = chain;
exports.chain_ = chain_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var Finalizer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Managed/ReleaseMap/finalizer.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Ref/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f0`
 */
function chain_(self, f0) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "outerStream", () => self.proc), "currOuterChunk", () => M.fromEffect(Ref.makeRef(Tp.tuple(A.empty(), 0)))), "currInnerStream", () => M.fromEffect(Ref.makeRef(Pull.end))), "innerFinalizer", () => M.finalizerRef(Finalizer.noopFinalizer)), ({
    currInnerStream,
    currOuterChunk,
    innerFinalizer,
    outerStream
  }) => new _definitions.Chain(f0, outerStream, currOuterChunk, currInnerStream, innerFinalizer).apply()));
}
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f0`
 */


function chain(f0) {
  return self => chain_(self, f0);
}
//# sourceMappingURL=chain.js.map