// ets_tracing: off
import * as Chunk from "../core.mjs";
import { ArrTypeId, concrete } from "../definition.mjs";
/**
 * Drops all elements so long as the predicate returns true.
 */

export function dropWhile_(self, f) {
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

        return Chunk.drop_(self, i);
      }

    default:
      {
        const iterator = self.arrayLikeIterator();
        let cont = true;
        let i = 0;
        let next;

        while (cont && (next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let j = 0;

          while (cont && j < len) {
            const a = array[j];

            if (f(a)) {
              i++;
              j++;
            } else {
              cont = false;
            }
          }
        }

        return Chunk.drop_(self, i);
      }
  }
}
/**
 * Drops all elements so long as the predicate returns true.
 *
 * @ets_data_first dropWhile_
 */

export function dropWhile(f) {
  return self => dropWhile_(self, f);
}
//# sourceMappingURL=dropWhile.mjs.map