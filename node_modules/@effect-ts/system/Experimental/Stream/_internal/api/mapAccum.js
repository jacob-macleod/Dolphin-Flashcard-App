"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAccum = mapAccum;
exports.mapAccum_ = mapAccum_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Statefully maps over the elements of this stream to produce new elements.
 */
function mapAccum_(self, s, f) {
  const accumulator = currS => CH.readWith(in_ => {
    const {
      tuple: [nextS, a2s]
    } = CK.mapAccum_(in_, currS, f);
    return CH.zipRight_(CH.write(a2s), accumulator(nextS));
  }, err => CH.fail(err), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](accumulator(s)));
}
/**
 * Statefully maps over the elements of this stream to produce new elements.
 *
 * @ets_data_first mapAccum_
 */


function mapAccum(s, f) {
  return self => mapAccum_(self, s, f);
}
//# sourceMappingURL=mapAccum.js.map