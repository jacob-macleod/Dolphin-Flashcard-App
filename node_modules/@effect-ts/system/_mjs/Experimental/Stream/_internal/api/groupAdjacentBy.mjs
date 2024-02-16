// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Creates a stream that groups on adjacent keys, calculated by function f.
 */

export function groupAdjacentBy_(self, f) {
  const go = (in_, state) => CK.reduce_(in_, Tp.tuple(CK.empty(), state), ({
    tuple: [os, o]
  }, a) => O.fold_(o, () => Tp.tuple(os, O.some(Tp.tuple(f(a), CK.single(a)))), agg => {
    const k2 = f(a);
    const {
      tuple: [k, aggregated]
    } = agg;

    if (k === k2) {
      return Tp.tuple(os, O.some(Tp.tuple(k, CK.append_(aggregated, a))));
    } else {
      return Tp.tuple(CK.append_(os, agg), O.some(Tp.tuple(k2, CK.single(a))));
    }
  }));

  const chunkAdjacent = buffer => CH.readWithCause(chunk => {
    const {
      tuple: [outputs, newBuffer]
    } = go(chunk, buffer);
    return CH.zipRight_(CH.write(outputs), chunkAdjacent(newBuffer));
  }, _ => CH.failCause(_), _ => O.fold_(buffer, () => CH.unit, o => CH.write(CK.single(o))));

  return new C.Stream(self.channel[">>>"](chunkAdjacent(O.none)));
}
/**
 * Creates a stream that groups on adjacent keys, calculated by function f.
 *
 * @ets_data_first groupAdjacentBy_
 */

export function groupAdjacentBy(f) {
  return self => groupAdjacentBy_(self, f);
}
//# sourceMappingURL=groupAdjacentBy.mjs.map