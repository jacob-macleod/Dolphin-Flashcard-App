"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectWhileM = collectWhileM;
exports.collectWhileM_ = collectWhileM_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var BP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/BufferedPull/index.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/Pull/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */
function collectWhileM_(self, pf) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "as", () => M.mapM_(self.proc, BP.make)), "done", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    as,
    done
  }) => T.chain_(done.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.chain_(BP.pullElement(as), a => O.fold_(pf(a), () => T.zipRight_(done.set(true), Pull.end), v => T.bimap_(v, O.some, A.single)));
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */


function collectWhileM(pf) {
  return self => collectWhileM_(self, pf);
}
//# sourceMappingURL=collectWhileM.js.map