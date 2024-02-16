// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
export function find_(self, f) {
  const loop = CH.readWith(in_ => O.fold_(CK.find_(in_, f), () => loop, i => CH.write(CK.single(i))), e => CH.fail(e), _ => CH.unit);
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Finds the first element emitted by this stream that satisfies the provided predicate.
 * @ets_data_first find_
 */

export function find(f) {
  return self => find_(self, f);
}
//# sourceMappingURL=find.mjs.map