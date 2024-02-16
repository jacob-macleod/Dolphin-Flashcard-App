"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeWhileEffect = takeWhileEffect;
exports.takeWhileEffect_ = takeWhileEffect_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var coreMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/map.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes all elements so long as the effectual predicate returns true.
 */
function takeWhileEffect_(self, f) {
  return core.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let next;
    let taking = core.succeed(true);
    let builder = Chunk.empty();

    while ((next = iterator.next()) && !next.done) {
      const array = next.value;
      const len = array.length;
      let i = 0;

      while (i < len) {
        const a = array[i];
        taking = core.chain_(taking, d => coreMap.map_(d ? f(a) : core.succeed(false), b => {
          if (b) {
            builder = Chunk.append_(builder, a);
          }

          return b;
        }));
        i++;
      }
    }

    return coreMap.map_(taking, () => builder);
  });
}
/**
 * Takes all elements so long as the effectual predicate returns true.
 *
 * @ets_data_first takeWhileEffect_
 */


function takeWhileEffect(f) {
  return self => takeWhileEffect_(self, f);
}
//# sourceMappingURL=takeWhileEffect.js.map