"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitWhere = splitWhere;
exports.splitWhere_ = splitWhere_;

var _definition = /*#__PURE__*/require("../definition.js");

var _splitAt = /*#__PURE__*/require("./splitAt.js");

/**
 * Splits this chunk on the first element that matches this predicate.
 */
function splitWhere_(self, f) {
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

      if (f(a)) {
        cont = false;
      } else {
        i++;
        j++;
      }
    }
  }

  return (0, _splitAt.splitAt_)(self, i);
}
/**
 * Splits this chunk on the first element that matches this predicate.
 *
 * @ets_data_first splitWhere_
 */


function splitWhere(f) {
  return self => splitWhere_(self, f);
}
//# sourceMappingURL=splitWhere.js.map