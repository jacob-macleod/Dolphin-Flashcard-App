"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.halt = halt;
exports.haltWith = haltWith;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../deps.js"));

var _fromEffect = /*#__PURE__*/require("../fromEffect.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns an effect that models failure with the specified `Cause`.
 */
function halt(self, __trace) {
  return (0, _fromEffect.fromEffect)(T.halt(self), __trace);
}
/**
 * Returns an effect that models failure with the specified `Cause`.
 */


function haltWith(self, __trace) {
  return (0, _fromEffect.fromEffect)(T.haltWith(self, __trace));
}
//# sourceMappingURL=halt.js.map