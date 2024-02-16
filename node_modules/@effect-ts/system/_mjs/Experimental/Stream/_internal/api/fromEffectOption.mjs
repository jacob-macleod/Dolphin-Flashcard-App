// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Creates a stream from an effect producing a value of type `A` or an empty Stream
 */

export function fromEffectOption(fa) {
  return new C.Stream(CH.unwrap(T.fold_(fa, O.fold(() => CH.end(undefined), e => CH.fail(e)), a => CH.write(CK.single(a)))));
}
//# sourceMappingURL=fromEffectOption.mjs.map