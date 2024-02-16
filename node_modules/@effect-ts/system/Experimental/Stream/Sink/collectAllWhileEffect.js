"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectAllWhileEffect = collectAllWhileEffect;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/List/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index5 = /*#__PURE__*/require("../../../Function/index.js");

var FoldEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./foldEffect.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Accumulates incoming elements into a chunk as long as they verify effectful predicate `p`.
 */
function collectAllWhileEffect(p) {
  return Map.map_(FoldEffect.foldEffect(Tp.tuple(L.empty(), true), Tp.get(1), ({
    tuple: [as, _]
  }, a) => T.map_(p(a), _ => {
    if (_) {
      return Tp.tuple(L.prepend_(as, a), true);
    } else {
      return Tp.tuple(as, false);
    }
  })), ({
    tuple: [is, _]
  }) => CK.from(L.reverse(is)));
}
//# sourceMappingURL=collectAllWhileEffect.js.map