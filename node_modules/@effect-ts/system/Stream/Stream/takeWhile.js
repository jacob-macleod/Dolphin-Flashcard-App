"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeWhile = takeWhile;
exports.takeWhile_ = takeWhile_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _index4 = /*#__PURE__*/require("../Take/index.js");

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */
function takeWhile_(self, pred) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    chunks,
    doneRef
  }) => T.chain_(doneRef.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.map_(T.tap_(T.let_(T.bind_(T.do, "chunk", () => chunks), "taken", ({
        chunk
      }) => A.takeWhile_(chunk, pred)), ({
        taken
      }) => T.when_(doneRef.set(true), () => A.size(taken) < _index4.chunk.length)), ({
        taken
      }) => taken);
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */


function takeWhile(pred) {
  return self => takeWhile_(self, pred);
}
//# sourceMappingURL=takeWhile.js.map