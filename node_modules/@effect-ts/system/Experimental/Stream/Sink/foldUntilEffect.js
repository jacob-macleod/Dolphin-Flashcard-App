"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foldUntilEffect = foldUntilEffect;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var FoldEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./foldEffect.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a sink that effectfully folds elements of type `In` into a structure
 * of type `S` until `max` elements have been folded.
 *
 * Like `foldWeightedM`, but with a constant cost function of 1.
 */
function foldUntilEffect(z, max, f) {
  return Map.map_(FoldEffect.foldEffect(Tp.tuple(z, 0), ({
    tuple: [_, a]
  }) => a < max, ({
    tuple: [o, count]
  }, i) => T.map_(f(o, i), _ => Tp.tuple(_, count + 1))), Tp.get(0));
}
//# sourceMappingURL=foldUntilEffect.js.map