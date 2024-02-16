// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as map from "../../../../Effect/map.mjs";
import * as zipWith from "../../../../Effect/zipWith.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Chunk from "../core.mjs";
import * as ChunkDef from "../definition.mjs";
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 */

export function collectWhileEffect_(self, f) {
  ;

  switch (self._typeId) {
    case ChunkDef.SingletonTypeId:
      {
        return O.fold_(f(self.a), () => core.succeed(Chunk.empty()), b => map.map_(b, Chunk.single));
      }

    case ChunkDef.ArrTypeId:
      {
        const array = self.arrayLike();
        let dest = core.succeed(Chunk.empty());

        for (let i = 0; i < array.length; i++) {
          const rhs = f(array[i]);

          if (O.isSome(rhs)) {
            dest = zipWith.zipWith_(dest, rhs.value, Chunk.append_);
          } else {
            return dest;
          }
        }

        return dest;
      }

    default:
      {
        return collectWhileEffect_(self.materialize(), f);
      }
  }
}
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhileEffect_
 */

export function collectWhileEffect(f) {
  return self => collectWhileEffect_(self, f);
}
//# sourceMappingURL=collectWhileEffect.mjs.map