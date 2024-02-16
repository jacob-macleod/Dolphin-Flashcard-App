// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as coreMap from "../../../../Effect/map.mjs";
import * as Tp from "../../Tuple/index.mjs";
import * as Chunk from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 */

export function mapAccumEffect_(self, s, f) {
  return core.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let dest = core.succeed(s);
    let builder = Chunk.empty();
    let next;

    while ((next = iterator.next()) && !next.done) {
      const array = next.value;
      const length = array.length;
      let i = 0;

      while (i < length) {
        const a = array[i];
        dest = core.chain_(dest, state => coreMap.map_(f(state, a), ({
          tuple: [s, b]
        }) => {
          builder = Chunk.append_(builder, b);
          return s;
        }));
        i++;
      }
    }

    return coreMap.map_(dest, s => Tp.tuple(s, builder));
  });
}
/**
 * Statefully and effectfully maps over the elements of this chunk to produce
 * new elements.
 *
 * @ets_data_first mapAccumEffect_
 */

export function mapAccumEffect(s, f) {
  return self => mapAccumEffect_(self, s, f);
}
//# sourceMappingURL=mapAccumEffect.mjs.map