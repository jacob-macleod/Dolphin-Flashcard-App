"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideSome = provideSome;
exports.provideSome_ = provideSome_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */
function provideSome_(effect, f, __trace) {
  return core.accessM(r0 => core.provideAll_(effect, f(r0)), __trace);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 *
 * @ets_data_first provideSome_
 */


function provideSome(f, __trace) {
  return effect => provideSome_(effect, f, __trace);
}
//# sourceMappingURL=provideSome.js.map