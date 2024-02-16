import { ArrTypeId, concrete, SingletonTypeId } from "../definition.mjs";
/**
 * Folds over the elements in this chunk from the left.
 */

export function reduce_(self, s, f) {
  ;

  switch (self._typeId) {
    case SingletonTypeId:
      {
        return f(s, self.a);
      }

    case ArrTypeId:
      {
        const arr = self.arrayLike();
        const len = arr.length;
        let s1 = s;
        let i = 0;

        while (i < len) {
          s1 = f(s1, arr[i]);
          i++;
        }

        return s1;
      }

    default:
      {
        const iterator = self.arrayLikeIterator();
        let next;
        let s1 = s;

        while ((next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let i = 0;

          while (i < len) {
            const a = array[i];
            s1 = f(s1, a);
            i++;
          }
        }

        return s1;
      }
  }
}
/**
 * Folds over the elements in this chunk from the left.
 *
 * @ets_data_first reduce_
 */

export function reduce(s, f) {
  return self => reduce_(self, s, f);
}
//# sourceMappingURL=reduce.mjs.map