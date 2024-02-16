// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f`
 */

export function chain_(self, f) {
  return new C.Stream(CH.concatMap_(self.channel, o => CK.reduce_(CK.map_(o, x => f(x).channel), CH.unit, (s, a) => CH.chain_(s, () => a))));
}
/**
 * Returns a stream made of the concatenation in strict order of all the streams
 * produced by passing each element of this stream to `f`
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return self => chain_(self, f);
}
//# sourceMappingURL=chain.mjs.map