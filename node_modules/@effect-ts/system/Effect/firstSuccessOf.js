"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstSuccessOf = firstSuccessOf;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var NEA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/NonEmptyArray/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _orElse = /*#__PURE__*/require("./orElse.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns an effect that yields the value of the first
 * effect to succeed.
 */
function firstSuccessOf(effects, __trace) {
  const first = NEA.head(effects);
  const rest = NEA.tail(effects);
  return (0, _core.suspend)(() => A.reduce_(rest, first, (b, a) => (0, _orElse.orElse_)(b, () => a)), __trace);
}
//# sourceMappingURL=firstSuccessOf.js.map