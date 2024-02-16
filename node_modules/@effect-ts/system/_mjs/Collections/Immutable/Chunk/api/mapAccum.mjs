// ets_tracing: off
import * as Tp from "../../Tuple/index.mjs";
import * as Chunk from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Statefully maps over the chunk, producing new elements of type `B`.
 */

export function mapAccum_(self, s, f) {
  const iterator = self.arrayLikeIterator();
  let next;
  let s1 = s;
  let builder = Chunk.empty();

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;

    while (i < len) {
      const a = array[i];
      const x = f(s1, a);
      s1 = x.get(0);
      builder = Chunk.append_(builder, x.get(1));
      i++;
    }
  }

  return Tp.tuple(s1, builder);
}
/**
 * Statefully maps over the chunk, producing new elements of type `B`.
 *
 * @ets_data_first mapAccum_
 */

export function mapAccum(s, f) {
  return self => mapAccum_(self, s, f);
}
//# sourceMappingURL=mapAccum.mjs.map