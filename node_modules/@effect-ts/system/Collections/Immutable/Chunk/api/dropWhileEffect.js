"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropWhileEffect = dropWhileEffect;
exports.dropWhileEffect_ = dropWhileEffect_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var coreMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/map.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Drops all elements so long as the predicate returns true.
 */
function dropWhileEffect_(self, f) {
  return core.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let next;
    let dropping = core.succeed(true);
    let builder = Chunk.empty();

    while ((next = iterator.next()) && !next.done) {
      const array = next.value;
      const len = array.length;
      let i = 0;

      while (i < len) {
        const a = array[i];
        dropping = core.chain_(dropping, d => coreMap.map_(d ? f(a) : core.succeed(false), b => {
          if (!b) {
            builder = Chunk.append_(builder, a);
          }

          return b;
        }));
        i++;
      }
    }

    return coreMap.map_(dropping, () => builder);
  });
}
/**
 * Drops all elements so long as the predicate returns true.
 *
 * @ets_data_first dropWhileEffect_
 */


function dropWhileEffect(f) {
  return self => dropWhileEffect_(self, f);
}
//# sourceMappingURL=dropWhileEffect.js.map