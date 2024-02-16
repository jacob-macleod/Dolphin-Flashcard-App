"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rechunk = rechunk;
exports.rechunk_ = rechunk_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _halt = /*#__PURE__*/require("./halt.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class State {
  constructor(buffer, done) {
    this.buffer = buffer;
    this.done = done;
  }

}

function emitOrAccumulate(buffer, done, ref, pull, n) {
  if (A.size(buffer) < n) {
    if (done) {
      if (A.isEmpty(buffer)) {
        return Pull.end;
      } else {
        return T.zipRight_(ref.set(new State(A.empty(), true)), Pull.emitChunk(buffer));
      }
    } else {
      return T.foldM_(pull, O.fold(() => emitOrAccumulate(buffer, true, ref, pull, n), Pull.fail), ch => emitOrAccumulate(A.concat_(buffer, ch), false, ref, pull, n));
    }
  } else {
    const {
      tuple: [chunk, leftover]
    } = A.splitAt_(buffer, n);
    return T.zipRight_(ref.set(new State(leftover, done)), Pull.emitChunk(chunk));
  }
}
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 */


function rechunk_(self, n) {
  if (n < 1) {
    return (0, _halt.halt)(C.die(new C.IllegalArgumentException("chunkN: n must be at least 1")));
  } else {
    return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "ref", () => T.toManaged(Ref.makeRef(new State(A.empty(), false)))), "p", () => self.proc), "pull", ({
      p,
      ref
    }) => T.chain_(ref.get, s => emitOrAccumulate(s.buffer, s.done, ref, p, n))), ({
      pull
    }) => pull));
  }
}
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 */


function rechunk(n) {
  return self => rechunk_(self, n);
}
//# sourceMappingURL=rechunk.js.map