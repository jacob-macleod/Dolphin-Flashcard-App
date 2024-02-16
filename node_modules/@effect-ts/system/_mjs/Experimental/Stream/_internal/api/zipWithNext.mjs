// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Zips each element with the next element if present.
 */

export function zipWithNext(self) {
  const process = last => CH.readWith(in_ => {
    const {
      tuple: [newlast, chunk]
    } = CK.mapAccum_(in_, last, (prev, curr) => Tp.tuple(O.some(curr), O.map_(prev, _ => Tp.tuple(_, curr))));
    const out = CK.collect_(chunk, O.fold(() => O.none, ({
      tuple: [prev, curr]
    }) => O.some(Tp.tuple(prev, O.some(curr)))));
    return CH.zipRight_(CH.write(out), process(newlast));
  }, err => CH.fail(err), _ => O.fold_(last, () => CH.unit, value => CH.zipRight_(CH.write(CK.single(Tp.tuple(value, O.none))), CH.unit)));

  return new C.Stream(self.channel[">>>"](process(O.none)));
}
//# sourceMappingURL=zipWithNext.mjs.map