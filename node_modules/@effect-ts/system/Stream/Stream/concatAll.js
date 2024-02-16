"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatAll = concatAll;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function go(streams, chunkSize, currIndex, currStream, switchStream) {
  return T.catchAllCause_(T.flatten(currStream.get), x => O.fold_(C.sequenceCauseOption(x), () => T.chain_(Ref.getAndUpdate_(currIndex, x => x + 1), i => i >= chunkSize ? Pull.end : T.zipRight_(T.chain_(switchStream(A.unsafeGet_(streams, i).proc), currStream.set), go(streams, chunkSize, currIndex, currStream, switchStream))), Pull.halt));
}
/**
 * Concatenates all of the streams in the chunk to one stream.
 */


function concatAll(streams) {
  const chunkSize = A.size(streams);
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "currIndex", () => Ref.makeManagedRef(0)), "currStream", () => Ref.makeManagedRef(Pull.end)), "switchStream", () => M.switchable()), ({
    currIndex,
    currStream,
    switchStream
  }) => go(streams, chunkSize, currIndex, currStream, switchStream)));
}
//# sourceMappingURL=concatAll.js.map