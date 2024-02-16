"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValidationF = getValidationF;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Tuple"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Either"));

var _Function = /*#__PURE__*/require("@effect-ts/system/Function");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../HKT/index.js"));

var _succeed = /*#__PURE__*/require("./succeed.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function getValidationF(F) {
  return A => ({
    any: F.any,
    map: F.map,
    both: fb => fa => F.flatten(F.map(({
      tuple: [maybeA, maybeB]
    }) => E.fold_(maybeA, ea => E.fold_(maybeB, eb => F.fail(A.combine(ea, eb)), () => F.fail(ea)), a => E.fold_(maybeB, e => F.fail(e), b => (0, _succeed.succeedF)(F)(Tp.tuple(a, b)))))(F.both(F.either(fb))(F.either(fa))))
  });
}
//# sourceMappingURL=validation.js.map