// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Finds the first element emitted by this stream that satisfies the provided effectful predicate.
 */

export function findEffect_(self, f) {
  const loop = CH.readWith(in_ => CH.unwrap(T.map_(CK.findEffect_(in_, f), O.fold(() => loop, i => CH.write(CK.single(i))))), e => CH.fail(e), _ => CH.unit);
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Finds the first element emitted by this stream that satisfies the provided effectful predicate.
 * @ets_data_first findEffect_
 */

export function findEffect(f) {
  return self => findEffect_(self, f);
}
//# sourceMappingURL=findEffect.mjs.map