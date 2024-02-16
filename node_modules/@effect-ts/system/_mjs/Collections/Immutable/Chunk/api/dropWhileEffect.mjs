// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as coreMap from "../../../../Effect/map.mjs";
import * as Chunk from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Drops all elements so long as the predicate returns true.
 */

export function dropWhileEffect_(self, f) {
  return core.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let next;
    let dropping = core.succeed(true);
    let builder = Chunk.empty();

    while ((next = iterator.next()) && !next.done) {
      const array = next.value;
      const len = array.length;
      let i = 0;

      while (i < len) {
        const a = array[i];
        dropping = core.chain_(dropping, d => coreMap.map_(d ? f(a) : core.succeed(false), b => {
          if (!b) {
            builder = Chunk.append_(builder, a);
          }

          return b;
        }));
        i++;
      }
    }

    return coreMap.map_(dropping, () => builder);
  });
}
/**
 * Drops all elements so long as the predicate returns true.
 *
 * @ets_data_first dropWhileEffect_
 */

export function dropWhileEffect(f) {
  return self => dropWhileEffect_(self, f);
}
//# sourceMappingURL=dropWhileEffect.mjs.map