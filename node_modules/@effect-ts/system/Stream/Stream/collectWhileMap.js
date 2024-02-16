"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectWhile = collectWhile;
exports.collectWhileMap = collectWhileMap;
exports.collectWhileMap_ = collectWhileMap_;
exports.collectWhile_ = collectWhile_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */
function collectWhileMap_(self, f) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    chunks,
    doneRef
  }) => T.chain_(doneRef.get, done => {
    if (done) {
      return Pull.end;
    } else {
      return T.chain_(T.bind_(T.do, "chunk", () => chunks), ({
        chunk
      }) => {
        const remaining = A.collectWhile_(chunk, f);
        return T.as_(T.when_(doneRef.set(true), () => A.size(remaining) < A.size(chunk)), remaining);
      });
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */


function collectWhileMap(f) {
  return self => collectWhileMap_(self, f);
}

function collectWhile_(self, f) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    chunks,
    doneRef
  }) => T.chain_(doneRef.get, done => {
    if (done) {
      return Pull.end;
    } else {
      return T.chain_(T.bind_(T.do, "chunk", () => chunks), ({
        chunk
      }) => {
        const remaining = A.collectWhile_(chunk, O.fromPredicate(f));
        return T.as_(T.when_(doneRef.set(true), () => A.size(remaining) < A.size(chunk)), remaining);
      });
    }
  })), ({
    pull
  }) => pull));
}

function collectWhile(f) {
  return self => collectWhile_(self, f);
}
//# sourceMappingURL=collectWhileMap.js.map