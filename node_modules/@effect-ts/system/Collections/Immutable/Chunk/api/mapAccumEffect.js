"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAccumEffect = mapAccumEffect;
exports.mapAccumEffect_ = mapAccumEffect_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var coreMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/map.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Tuple/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 */
function mapAccumEffect_(self, s, f) {
  return core.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let dest = core.succeed(s);
    let builder = Chunk.empty();
    let next;

    while ((next = iterator.next()) && !next.done) {
      const array = next.value;
      const length = array.length;
      let i = 0;

      while (i < length) {
        const a = array[i];
        dest = core.chain_(dest, state => coreMap.map_(f(state, a), ({
          tuple: [s, b]
        }) => {
          builder = Chunk.append_(builder, b);
          return s;
        }));
        i++;
      }
    }

    return coreMap.map_(dest, s => Tp.tuple(s, builder));
  });
}
/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 *
 * @ets_data_first mapAccumEffect_
 */


function mapAccumEffect(s, f) {
  return self => mapAccumEffect_(self, s, f);
}
//# sourceMappingURL=mapAccumEffect.js.map