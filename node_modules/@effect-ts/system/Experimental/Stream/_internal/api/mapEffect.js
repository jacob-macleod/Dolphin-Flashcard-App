"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapEffect = mapEffect;
exports.mapEffect_ = mapEffect_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var LoopOnPartialChunksElements = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./loopOnPartialChunksElements.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Maps over elements of the stream with the specified effectful function.
 */
function mapEffect_(self, f) {
  return LoopOnPartialChunksElements.loopOnPartialChunksElements_(self, (a, emit) => T.chain_(f(a), emit));
}
/**
 * Maps over elements of the stream with the specified effectful function.
 *
 * @ets_data_first mapEffect_
 */


function mapEffect(f) {
  return self => mapEffect_(self, f);
}
//# sourceMappingURL=mapEffect.js.map