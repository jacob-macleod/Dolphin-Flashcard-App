// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as Chunk from "../core.mjs";
import * as ChunkDef from "../definition.mjs";
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 */

export function collectWhile_(self, f) {
  ;

  switch (self._typeId) {
    case ChunkDef.SingletonTypeId:
      {
        return O.fold_(f(self.a), () => Chunk.empty(), Chunk.single);
      }

    case ChunkDef.ArrTypeId:
      {
        const array = self.arrayLike();
        let dest = Chunk.empty();

        for (let i = 0; i < array.length; i++) {
          const rhs = f(array[i]);

          if (O.isSome(rhs)) {
            dest = Chunk.append_(dest, rhs.value);
          } else {
            return dest;
          }
        }

        return dest;
      }

    default:
      {
        return collectWhile_(self.materialize(), f);
      }
  }
}
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhile_
 */

export function collectWhile(f) {
  return self => collectWhile_(self, f);
}
//# sourceMappingURL=collectWhile.mjs.map