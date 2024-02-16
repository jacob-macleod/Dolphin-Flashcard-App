"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.take = take;
exports.take_ = take_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _empty = /*#__PURE__*/require("./empty.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes the specified number of elements from this stream.
 */
function take_(self, n) {
  if (n <= 0) {
    return _empty.empty;
  } else {
    return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "counterRef", () => T.toManaged(Ref.makeRef(0))), "pull", ({
      chunks,
      counterRef
    }) => T.chain_(counterRef.get, cnt => {
      if (cnt >= n) {
        return Pull.end;
      } else {
        return T.map_(T.tap_(T.let_(T.bind_(T.do, "chunk", () => chunks), "taken", ({
          chunk
        }) => {
          if (A.size(chunk) <= n - cnt) {
            return chunk;
          } else {
            return A.take_(chunk, n - cnt);
          }
        }), ({
          taken
        }) => counterRef.set(cnt + A.size(taken))), ({
          taken
        }) => taken);
      }
    })), ({
      pull
    }) => pull));
  }
}
/**
 * Takes the specified number of elements from this stream.
 */


function take(n) {
  return self => take_(self, n);
}
//# sourceMappingURL=take.js.map