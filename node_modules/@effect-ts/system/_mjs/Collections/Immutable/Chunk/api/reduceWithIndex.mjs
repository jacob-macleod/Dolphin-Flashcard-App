import { ArrTypeId, concrete, SingletonTypeId } from "../definition.mjs";
/**
 * Folds over the elements in this chunk from the left.
 */

export function reduceWithIndex_(self, s, f) {
  ;

  switch (self._typeId) {
    case SingletonTypeId:
      {
        return f(0, s, self.a);
      }

    case ArrTypeId:
      {
        const arr = self.arrayLike();
        const len = arr.length;
        let s1 = s;
        let i = 0;

        while (i < len) {
          s1 = f(i, s1, arr[i]);
          i++;
        }

        return s1;
      }

    default:
      {
        const iterator = self.arrayLikeIterator();
        let next;
        let s1 = s;
        let index = 0;

        while ((next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let i = 0;

          while (i < len) {
            const a = array[i];
            s1 = f(index, s1, a);
            i++;
            index++;
          }
        }

        return s1;
      }
  }
}
/**
 * Folds over the elements in this chunk from the left.
 *
 * @ets_data_first reduceWithIndex_
 */

export function reduceWithIndex(s, f) {
  return self => reduceWithIndex_(self, s, f);
}
//# sourceMappingURL=reduceWithIndex.mjs.map