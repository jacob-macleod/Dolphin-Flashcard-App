"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenEffect = whenEffect;
exports.whenEffect_ = whenEffect_;

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var Empty = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./empty.js"));

var FromEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 */
function whenEffect_(self, b) {
  return Chain.chain_(FromEffect.fromEffect(b), _ => _ ? self : Empty.empty);
}
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 *
 * @ets_data_first whenEffect_
 */


function whenEffect(b) {
  return self => whenEffect_(self, b);
}
//# sourceMappingURL=whenEffect.js.map