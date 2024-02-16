"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findEffect = findEffect;
exports.findEffect_ = findEffect_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Finds the first element emitted by this stream that satisfies the provided effectful predicate.
 */
function findEffect_(self, f) {
  const loop = CH.readWith(in_ => CH.unwrap(T.map_(CK.findEffect_(in_, f), O.fold(() => loop, i => CH.write(CK.single(i))))), e => CH.fail(e), _ => CH.unit);
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Finds the first element emitted by this stream that satisfies the provided effectful predicate.
 * @ets_data_first findEffect_
 */


function findEffect(f) {
  return self => findEffect_(self, f);
}
//# sourceMappingURL=findEffect.js.map