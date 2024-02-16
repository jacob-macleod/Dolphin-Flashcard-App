"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain = chain;
exports.chain_ = chain_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f`
 */
function chain_(self, f) {
  return new C.Stream(CH.concatMap_(self.channel, o => CK.reduce_(CK.map_(o, x => f(x).channel), CH.unit, (s, a) => CH.chain_(s, () => a))));
}
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f`
 *
 * @ets_data_first chain_
 */


function chain(f) {
  return self => chain_(self, f);
}
//# sourceMappingURL=chain.js.map