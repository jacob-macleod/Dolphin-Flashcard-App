"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceRight = reduceRight;
exports.reduceRight_ = reduceRight_;

var _definition = /*#__PURE__*/require("../definition.js");

/**
 * Folds over the elements in this chunk from the right.
 */
function reduceRight_(self, s, f) {
  ;

  switch (self._typeId) {
    case _definition.SingletonTypeId:
      {
        return f(self.a, s);
      }

    case _definition.ArrTypeId:
      {
        const arr = self.arrayLike();
        const len = arr.length;
        let s1 = s;
        let i = len - 1;

        while (i >= 0) {
          s1 = f(arr[i], s1);
          i--;
        }

        return s1;
      }

    default:
      {
        const iterator = self.reverseArrayLikeIterator();
        let next;
        let s1 = s;

        while ((next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let i = len - 1;

          while (i >= 0) {
            const a = array[i];
            s1 = f(a, s1);
            i--;
          }
        }

        return s1;
      }
  }
}
/**
 * Folds over the elements in this chunk from the right.
 *
 * @ets_data_first reduceRight_
 */


function reduceRight(s, f) {
  return self => reduceRight_(self, s, f);
}
//# sourceMappingURL=reduceRight.js.map