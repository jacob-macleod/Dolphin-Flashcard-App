// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Unwraps `Exit` values that also signify end-of-stream by failing with `None`.
 *
 * For `Exit<E, A>` values that do not signal end-of-stream, prefer:
 */

export function flattenExitOption(self) {
  const processChunk = (chunk, cont) => {
    const {
      tuple: [toEmit, rest]
    } = CK.splitWhere_(chunk, _ => !Ex.succeeded(_));
    const next = O.fold_(CK.head(rest), () => cont, Ex.fold(cause => O.fold_(CS.flipCauseOption(cause), () => CH.end(undefined), cause => CH.failCause(cause)), () => CH.end(undefined)));
    return CH.zipRight_(CH.write(CK.collect_(toEmit, Ex.fold(() => O.none, a => O.some(a)))), next);
  };

  const process = CH.readWithCause(chunk => processChunk(chunk, process), cause => CH.failCause(cause), _ => CH.end(undefined));
  return new C.Stream(self.channel[">>>"](process));
}
//# sourceMappingURL=flattenExitOption.mjs.map