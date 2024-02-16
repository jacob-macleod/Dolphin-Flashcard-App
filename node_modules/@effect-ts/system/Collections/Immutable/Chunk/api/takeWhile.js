"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeWhile = takeWhile;
exports.takeWhile_ = takeWhile_;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes all elements so long as the predicate returns true.
 */
function takeWhile_(self, f) {
  ;

  switch (self._typeId) {
    case _definition.ArrTypeId:
      {
        const arr = self.arrayLike();
        const len = arr.length;
        let i = 0;

        while (i < len && f(arr[i])) {
          i++;
        }

        return Chunk.take_(self, i);
      }

    default:
      {
        const iterator = self.arrayLikeIterator();
        let next;
        let cont = true;
        let i = 0;

        while (cont && (next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let j = 0;

          while (cont && j < len) {
            const a = array[j];

            if (!f(a)) {
              cont = false;
            } else {
              i++;
              j++;
            }
          }
        }

        return Chunk.take_(self, i);
      }
  }
}
/**
 * Takes all elements so long as the predicate returns true.
 *
 * @ets_data_first takeWhile_
 */


function takeWhile(f) {
  return self => takeWhile_(self, f);
}
//# sourceMappingURL=takeWhile.js.map