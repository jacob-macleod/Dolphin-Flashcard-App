"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectAllToMapN = collectAllToMapN;

var HM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/HashMap/index.js"));

var FoldWeighted = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./foldWeighted.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * A sink that collects first `n` keys into a map. The keys are calculated
 * from inputs using the keying function `key`; if multiple inputs use the
 * the same key, they are merged using the `f` function.
 */
function collectAllToMapN(n, key, f) {
  return FoldWeighted.foldWeighted(HM.make(), (acc, in_) => HM.has_(acc, key(in_)) ? 0 : 1, n, (acc, in_) => {
    const k = key(in_);

    if (HM.has_(acc, k)) {
      return HM.update_(acc, k, v => f(v, in_));
    } else {
      return HM.set_(acc, k, in_);
    }
  });
}
//# sourceMappingURL=collectAllToMapN.js.map