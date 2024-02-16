"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferUnbounded = bufferUnbounded;

var _index = /*#__PURE__*/require("../../Function/index.js");

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Ref/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var Take = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Take/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _toQueueUnbounded = /*#__PURE__*/require("./toQueueUnbounded.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * elements into an unbounded queue.
 */
function bufferUnbounded(self) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.do, "done", () => T.toManaged(Ref.makeRef(true))), "queue", () => (0, _toQueueUnbounded.toQueueUnbounded)(self)), ({
    done,
    queue
  }) => T.chain_(done.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.chain_(Q.take(queue), Take.foldM(() => T.zipRight_(done.set(true), Pull.end), Pull.halt, Pull.emitChunk));
    }
  })));
}
//# sourceMappingURL=bufferUnbounded.js.map