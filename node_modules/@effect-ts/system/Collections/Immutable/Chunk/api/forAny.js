"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forAny = forAny;
exports.forAny_ = forAny_;

var _definition = /*#__PURE__*/require("../definition.js");

/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 */
function forAny_(self, f) {
  const iterator = self.arrayLikeIterator();
  let next;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;

    while (i < len) {
      const a = array[i];

      if (f(a)) {
        return true;
      }

      i++;
    }
  }

  return false;
}
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 *
 * @ets_data_first forAll_
 */


function forAny(f) {
  return self => forAny_(self, f);
}
//# sourceMappingURL=forAny.js.map