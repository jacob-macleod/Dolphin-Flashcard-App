// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import * as coreZip from "../../../../Effect/zipWith.mjs";
import * as Chunk from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Filters this chunk by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 */

export function filterEffect_(self, f) {
  return core.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let next;
    let dest = core.succeed(Chunk.empty());

    while ((next = iterator.next()) && !next.done) {
      const array = next.value;
      const len = array.length;
      let i = 0;

      while (i < len) {
        const a = array[i];
        dest = coreZip.zipWith_(dest, f(a), (d, b) => b ? Chunk.append_(d, a) : d);
        i++;
      }
    }

    return dest;
  });
}
/**
 * Filters this chunk by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 *
 * @ets_data_first filterEffect_
 */

export function filterEffect(f) {
  return self => filterEffect_(self, f);
}
//# sourceMappingURL=filterEffect.mjs.map