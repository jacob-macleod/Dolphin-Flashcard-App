"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterEffect = filterEffect;
exports.filterEffect_ = filterEffect_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var coreZip = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/zipWith.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Filters this chunk by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 */
function filterEffect_(self, f) {
  return core.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let next;
    let dest = core.succeed(Chunk.empty());

    while ((next = iterator.next()) && !next.done) {
      const array = next.value;
      const len = array.length;
      let i = 0;

      while (i < len) {
        const a = array[i];
        dest = coreZip.zipWith_(dest, f(a), (d, b) => b ? Chunk.append_(d, a) : d);
        i++;
      }
    }

    return dest;
  });
}
/**
 * Filters this chunk by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 *
 * @ets_data_first filterEffect_
 */


function filterEffect(f) {
  return self => filterEffect_(self, f);
}
//# sourceMappingURL=filterEffect.js.map