"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAccumM = mapAccumM;
exports.mapAccumM_ = mapAccumM_;

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
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 *
 * @ets_data_first mapAccumM_
 */
function mapAccumM(z, f) {
  return self => mapAccumM_(self, z, f);
}
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 */


function mapAccumM_(self, z, f) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.do, "state", () => Ref.makeManagedRef(z)), "pull", () => M.mapM(BP.make)(self.proc)), ({
    pull,
    state
  }) => T.chain_(BP.pullElement(pull), o => T.mapError_(T.map_(T.tap_(T.bind_(T.bind_(T.do, "s", () => state.get), "t", ({
    s
  }) => f(s, o)), ({
    t
  }) => state.set(t.get(0))), ({
    t
  }) => A.single(t.get(1))), O.some))));
}
//# sourceMappingURL=mapAccumM.js.map