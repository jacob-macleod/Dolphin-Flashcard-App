// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as coreMap from "../../../../Effect/map.mjs";
import * as Chunk from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Takes all elements so long as the effectual predicate returns true.
 */

export function takeWhileEffect_(self, f) {
  return core.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let next;
    let taking = core.succeed(true);
    let builder = Chunk.empty();

    while ((next = iterator.next()) && !next.done) {
      const array = next.value;
      const len = array.length;
      let i = 0;

      while (i < len) {
        const a = array[i];
        taking = core.chain_(taking, d => coreMap.map_(d ? f(a) : core.succeed(false), b => {
          if (b) {
            builder = Chunk.append_(builder, a);
          }

          return b;
        }));
        i++;
      }
    }

    return coreMap.map_(taking, () => builder);
  });
}
/**
 * Takes all elements so long as the effectual predicate returns true.
 *
 * @ets_data_first takeWhileEffect_
 */

export function takeWhileEffect(f) {
  return self => takeWhileEffect_(self, f);
}
//# sourceMappingURL=takeWhileEffect.mjs.map