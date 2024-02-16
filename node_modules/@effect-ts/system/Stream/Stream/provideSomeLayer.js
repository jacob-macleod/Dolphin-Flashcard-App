"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideLayer = provideLayer;
exports.provideLayer_ = provideLayer_;
exports.provideSomeLayer = provideSomeLayer;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Layer/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _chain = /*#__PURE__*/require("./chain.js");

var _managed2 = /*#__PURE__*/require("./managed.js");

var _repeatEffectChunkOption = /*#__PURE__*/require("./repeatEffectChunkOption.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Provides a layer to the given effect
 */
function provideSomeLayer(layer) {
  return self => provideLayer_(self, layer["+++"](L.identity()));
}
/**
 * Provides a layer to the given effect
 */


function provideLayer_(self, layer) {
  return (0, _chain.chain_)((0, _managed2.managed)(M.gen(function* (_) {
    const r = yield* _(L.build(layer));
    const as = yield* _(M.provideAll_(self.proc, r));
    return T.provideAll_(as, r);
  })), _repeatEffectChunkOption.repeatEffectChunkOption);
}
/**
 * Provides a layer to the given effect
 */


function provideLayer(layer) {
  return self => provideLayer_(self, layer);
}
//# sourceMappingURL=provideSomeLayer.js.map