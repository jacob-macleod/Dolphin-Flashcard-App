import * as Chunk from "../core.mjs";
import { ArrTypeId, concrete } from "../definition.mjs";
export function filter_(self, f) {
  ;

  switch (self._typeId) {
    case ArrTypeId:
      {
        const arr = self.arrayLike();
        const len = arr.length;
        let i = 0;
        let builder = Chunk.empty();

        while (i < len) {
          const elem = arr[i];

          if (f(elem)) {
            builder = Chunk.append_(builder, elem);
          }

          i++;
        }

        return builder;
      }

    default:
      {
        const iterator = self.arrayLikeIterator();
        let next;
        let builder = Chunk.empty();

        while ((next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let i = 0;

          while (i < len) {
            const a = array[i];

            if (f(a)) {
              builder = Chunk.append_(builder, a);
            }

            i++;
          }
        }

        return builder;
      }
  }
}
export function filter(f) {
  return self => filter_(self, f);
}
//# sourceMappingURL=filter.mjs.map