"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;
exports.combine_ = combine_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var BP = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/BufferedPull/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _unfoldM = /*#__PURE__*/require("./unfoldM.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Combines the elements from this stream and the specified stream by repeatedly applying the
 * function `f` to extract an element using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * Where possible, prefer `Stream#combineChunks` for a more efficient implementation.
 */
function combine_(self, that, s, f) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "left", () => M.mapM_(self.proc, _ => BP.make(_))), "right", () => M.mapM_(that.proc, _ => BP.make(_))), "pull", ({
    left,
    right
  }) => (0, _unfoldM.unfoldM)(s, s => T.chain_(f(s, BP.pullElement(left), BP.pullElement(right)), _ => T.optional(T.done(_)))).proc), ({
    pull
  }) => pull));
}
/**
 * Combines the elements from this stream and the specified stream by repeatedly applying the
 * function `f` to extract an element using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * Where possible, prefer `Stream#combineChunks` for a more efficient implementation.
 *
 * @ets_data_first combine_
 */


function combine(that, s, f) {
  return self => combine_(self, that, s, f);
}
//# sourceMappingURL=combine.js.map