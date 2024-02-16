"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceRightWithIndex = reduceRightWithIndex;
exports.reduceRightWithIndex_ = reduceRightWithIndex_;

var _definition = /*#__PURE__*/require("../definition.js");

/**
 * Folds over the elements in this chunk from the right.
 */
function reduceRightWithIndex_(self, s, f) {
  ;

  switch (self._typeId) {
    case _definition.SingletonTypeId:
      {
        return f(0, self.a, s);
      }

    case _definition.ArrTypeId:
      {
        const arr = self.arrayLike();
        const len = arr.length;
        let s1 = s;
        let i = len - 1;

        while (i >= 0) {
          s1 = f(i, arr[i], s1);
          i--;
        }

        return s1;
      }

    default:
      {
        const iterator = self.reverseArrayLikeIterator();
        let next;
        let s1 = s;
        let index = self.length - 1;

        while ((next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let i = len - 1;

          while (i >= 0) {
            const a = array[i];
            s1 = f(index, a, s1);
            i--;
            index--;
          }
        }

        return s1;
      }
  }
}
/**
 * Folds over the elements in this chunk from the right.
 *
 * @ets_data_first reduceRightWithIndex_
 */


function reduceRightWithIndex(s, f) {
  return self => reduceRightWithIndex_(self, s, f);
}
//# sourceMappingURL=reduceRightWithIndex.js.map