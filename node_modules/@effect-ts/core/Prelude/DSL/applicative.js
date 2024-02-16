"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApplicativeF = getApplicativeF;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Tuple"));

var _Function = /*#__PURE__*/require("@effect-ts/system/Function");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../HKT/index.js"));

var _chain = /*#__PURE__*/require("./chain.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function getApplicativeF(F) {
  const chain = (0, _chain.chainF)(F);
  return {
    any: F.any,
    map: F.map,
    both: fb => fa => chain(a => F.map(b => Tp.tuple(b, a))(fa))(fb)
  };
}
//# sourceMappingURL=applicative.js.map