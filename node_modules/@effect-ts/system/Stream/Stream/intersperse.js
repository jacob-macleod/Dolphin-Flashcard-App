"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersperse = intersperse;
exports.intersperse_ = intersperse_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Intersperse stream with provided element similar to <code>List.mkString</code>.
 */
function intersperse_(self, middle) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "state", () => Ref.makeManagedRef(true)), "chunks", () => self.proc), "pull", ({
    chunks,
    state
  }) => T.chain_(chunks, os => {
    return Ref.modify_(state, first => {
      let builder = A.empty();
      let flagResult = first;

      for (const o of os) {
        if (flagResult) {
          flagResult = false;
          builder = A.append_(builder, o);
        } else {
          builder = A.append_(A.append_(builder, middle), o);
        }
      }

      return Tp.tuple(builder, flagResult);
    });
  })), ({
    pull
  }) => pull));
}
/**
 * Intersperse stream with provided element similar to <code>List.mkString</code>.
 */


function intersperse(middle) {
  return self => intersperse_(self, middle);
}
//# sourceMappingURL=intersperse.js.map