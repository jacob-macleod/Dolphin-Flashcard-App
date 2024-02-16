"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeUntil = takeUntil;
exports.takeUntil_ = takeUntil_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
function takeUntil_(self, pred) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "keepTakingRef", () => T.toManaged(Ref.makeRef(true))), "pull", ({
    chunks,
    keepTakingRef
  }) => {
    return T.chain_(keepTakingRef.get, keepTaking => {
      if (!keepTaking) {
        return Pull.end;
      } else {
        return T.map_(T.let_(T.let_(T.bind_(T.do, "chunk", () => chunks), "taken", ({
          chunk
        }) => A.takeWhile_(chunk, (0, _index2.not)(pred))), "last", ({
          chunk,
          taken
        }) => A.take_(A.drop_(chunk, A.size(taken)), 1)), ({
          last,
          taken
        }) => A.concat_(taken, last));
      }
    });
  }), ({
    pull
  }) => pull));
}
/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 */


function takeUntil(pred) {
  return self => takeUntil_(self, pred);
}
//# sourceMappingURL=takeUntil.js.map