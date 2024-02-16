// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as Chunk from "../core.mjs";
import * as ChunkDef from "../definition.mjs";
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 */

export function collectWithIndex_(self, f) {
  ;

  switch (self._typeId) {
    case ChunkDef.ArrTypeId:
      {
        const array = self.arrayLike();
        let dest = Chunk.empty();

        for (let i = 0; i < array.length; i++) {
          const rhs = f(i, array[i]);

          if (O.isSome(rhs)) {
            dest = Chunk.append_(dest, rhs.value);
          }
        }

        return dest;
      }

    default:
      {
        return collectWithIndex_(self.materialize(), f);
      }
  }
}
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 *
 * @ets_data_first collectWithIndex_
 */

export function collectWithIndex(f) {
  return self => collectWithIndex_(self, f);
}
//# sourceMappingURL=collectWithIndex.mjs.map