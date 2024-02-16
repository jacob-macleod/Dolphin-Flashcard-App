"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tap = tap;
exports.tap_ = tap_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Adds an effect to consumption of every element of the stream.
 */
function tap_(self, f) {
  return MapEffect.mapEffect_(self, a => T.as_(f(a), a));
}
/**
 * Adds an effect to consumption of every element of the stream.
 *
 * @ets_data_first tap_
 */


function tap(f) {
  return self => tap_(self, f);
}
//# sourceMappingURL=tap.js.map