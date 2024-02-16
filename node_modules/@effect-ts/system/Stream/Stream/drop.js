"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drop = drop;
exports.drop_ = drop_;

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
 * Drops the specified number of elements from this stream.
 */
function drop_(self, n) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "counterRef", () => T.toManaged(Ref.makeRef(0))), "pull", ({
    chunks,
    counterRef
  }) => {
    const go = T.chain_(chunks, chunk => T.chain_(counterRef.get, cnt => {
      if (cnt >= n) {
        return T.succeed(chunk);
      } else if (A.size(chunk) <= n - cnt) {
        return T.zipRight_(counterRef.set(cnt + A.size(chunk)), go);
      } else {
        return T.as_(counterRef.set(cnt + (n - cnt)), A.drop_(chunk, n - cnt));
      }
    }));
    return go;
  }), ({
    pull
  }) => pull));
}
/**
 * Drops the specified number of elements from this stream.
 */


function drop(n) {
  return self => drop_(self, n);
}
//# sourceMappingURL=drop.js.map