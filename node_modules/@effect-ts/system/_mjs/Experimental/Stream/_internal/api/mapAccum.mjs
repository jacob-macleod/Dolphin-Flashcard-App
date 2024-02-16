// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Statefully maps over the elements of this stream to produce new elements.
 */

export function mapAccum_(self, s, f) {
  const accumulator = currS => CH.readWith(in_ => {
    const {
      tuple: [nextS, a2s]
    } = CK.mapAccum_(in_, currS, f);
    return CH.zipRight_(CH.write(a2s), accumulator(nextS));
  }, err => CH.fail(err), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](accumulator(s)));
}
/**
 * Statefully maps over the elements of this stream to produce new elements.
 *
 * @ets_data_first mapAccum_
 */

export function mapAccum(s, f) {
  return self => mapAccum_(self, s, f);
}
//# sourceMappingURL=mapAccum.mjs.map