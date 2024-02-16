"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapEffect = mapEffect;
exports.mapEffect_ = mapEffect_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified effectful function to the terminal value
 * of this channel.
 */
function mapEffect_(self, f) {
  return C.chain_(self, z => C.fromEffect(f(z)));
}
/**
 * Returns a new channel, which is the same as this one, except the terminal value of the
 * returned channel is created by applying the specified effectful function to the terminal value
 * of this channel.
 *
 * @ets_data_first mapEffect_
 */


function mapEffect(f) {
  return self => mapEffect_(self, f);
}
//# sourceMappingURL=mapEffect.js.map