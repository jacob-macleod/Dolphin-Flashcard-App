"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAccum = mapAccum;
exports.mapAccum_ = mapAccum_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Tuple/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Statefully maps over the chunk, producing new elements of type `B`.
 */
function mapAccum_(self, s, f) {
  const iterator = self.arrayLikeIterator();
  let next;
  let s1 = s;
  let builder = Chunk.empty();

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;

    while (i < len) {
      const a = array[i];
      const x = f(s1, a);
      s1 = x.get(0);
      builder = Chunk.append_(builder, x.get(1));
      i++;
    }
  }

  return Tp.tuple(s1, builder);
}
/**
 * Statefully maps over the chunk, producing new elements of type `B`.
 *
 * @ets_data_first mapAccum_
 */


function mapAccum(s, f) {
  return self => mapAccum_(self, s, f);
}
//# sourceMappingURL=mapAccum.js.map