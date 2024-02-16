// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as map from "../../../../Effect/map.mjs";
import * as zipWith from "../../../../Effect/zipWith.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Chunk from "../core.mjs";
import * as ChunkDef from "../definition.mjs";
/**
 * Returns a filtered, mapped subset of the elements of this chunk based on a .
 */

export function collectEffect_(self, f) {
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
          }
        }

        return dest;
      }

    default:
      {
        return collectEffect_(self.materialize(), f);
      }
  }
}
/**
 * Returns a filtered, mapped subset of the elements of this chunk based on a .
 *
 * @ets_data_first collectEffect_
 */

export function collectEffect(f) {
  return self => collectEffect_(self, f);
}
//# sourceMappingURL=collectEffect.mjs.map