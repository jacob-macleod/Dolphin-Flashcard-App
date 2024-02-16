// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as Chunk from "../core.mjs";
import * as ChunkDef from "../definition.mjs";
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 */

export function collect_(self, f) {
  ;

  switch (self._typeId) {
    case ChunkDef.ArrTypeId:
      {
        const array = self.arrayLike();
        let dest = Chunk.empty();

        for (let i = 0; i < array.length; i++) {
          const rhs = f(array[i]);

          if (O.isSome(rhs)) {
            dest = Chunk.append_(dest, rhs.value);
          }
        }

        return dest;
      }

    default:
      {
        return collect_(self.materialize(), f);
      }
  }
}
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 *
 * @ets_data_first collect_
 */

export function collect(f) {
  return self => collect_(self, f);
}
//# sourceMappingURL=collect.mjs.map