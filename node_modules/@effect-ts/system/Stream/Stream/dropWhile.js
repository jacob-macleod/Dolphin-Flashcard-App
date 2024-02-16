"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropWhile = dropWhile;
exports.dropWhile_ = dropWhile_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */
function dropWhile_(self, pred) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "keepDroppingRef", () => T.toManaged(Ref.makeRef(true))), "pull", ({
    chunks,
    keepDroppingRef
  }) => {
    const go = T.chain_(chunks, chunk => T.chain_(keepDroppingRef.get, keepDropping => {
      if (!keepDropping) {
        return T.succeed(chunk);
      } else {
        const remaining = A.dropWhile_(chunk, pred);
        const empty = A.isEmpty(remaining);

        if (empty) {
          return go;
        } else {
          return T.as_(keepDroppingRef.set(false), remaining);
        }
      }
    }));
    return go;
  }), ({
    pull
  }) => pull));
}
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */


function dropWhile(pred) {
  return self => dropWhile_(self, pred);
}
//# sourceMappingURL=dropWhile.js.map