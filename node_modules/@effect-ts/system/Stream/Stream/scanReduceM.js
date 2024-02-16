"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanReduceM = scanReduceM;
exports.scanReduceM_ = scanReduceM_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var BP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BufferedPull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanM`.
 */
function scanReduceM_(self, f) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.do, "state", () => Ref.makeManagedRef(O.none)), "pull", () => M.mapM_(self.proc, _ => BP.make(_))), ({
    pull,
    state
  }) => T.chain_(BP.pullElement(pull), curr => T.chain_(state.get, O.fold(() => T.as_(state.set(O.some(curr)), A.single(curr)), s => T.asSomeError(T.map_(T.tap_(f(s, curr), o => state.set(O.some(o))), A.single)))))));
}
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanM`.
 */


function scanReduceM(f) {
  return self => scanReduceM_(self, f);
}
//# sourceMappingURL=scanReduceM.js.map