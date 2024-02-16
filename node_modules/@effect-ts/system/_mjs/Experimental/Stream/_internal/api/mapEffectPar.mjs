// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. Transformed elements
 * will be emitted in the original order.
 *
 * @note This combinator destroys the chunking structure. It's recommended to use rechunk afterwards.
 */

export function mapEffectPar(self, f, n) {
  return new C.Stream(CH.mapOut_(CH.mapOutEffectPar_(CH.concatMap_(self.channel, CH.writeChunk), n, f), CK.single));
}
//# sourceMappingURL=mapEffectPar.mjs.map