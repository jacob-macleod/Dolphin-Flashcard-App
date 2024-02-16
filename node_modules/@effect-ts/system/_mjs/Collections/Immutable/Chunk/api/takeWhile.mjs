// ets_tracing: off
import * as Chunk from "../core.mjs";
import { ArrTypeId, concrete } from "../definition.mjs";
/**
 * Takes all elements so long as the predicate returns true.
 */

export function takeWhile_(self, f) {
  ;

  switch (self._typeId) {
    case ArrTypeId:
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

export function takeWhile(f) {
  return self => takeWhile_(self, f);
}
//# sourceMappingURL=takeWhile.mjs.map