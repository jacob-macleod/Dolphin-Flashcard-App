"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLastIndex = findLastIndex;
exports.findLastIndex_ = findLastIndex_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns the last index of the element that satisfies the predicate.
 */
function findLastIndex_(self, f) {
  ;
  const iterator = self.reverseArrayLikeIterator();
  let next;
  let index = self.length - 1;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = len - 1;

    while (i >= 0) {
      const a = array[i];

      if (f(a)) {
        return O.some(index);
      }

      i--;
      index--;
    }
  }

  return O.none;
}
/**
 * Returns the last index of the element that satisfies the predicate.
 *
 * @ets_data_first findLastIndex_
 */


function findLastIndex(f) {
  return self => findLastIndex_(self, f);
}
//# sourceMappingURL=findLastIndex.js.map