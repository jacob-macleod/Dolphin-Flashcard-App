// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Maps each element of this stream to another stream and returns the
 * non-deterministic merge of those streams, executing up to `n` inner streams
 * concurrently. Up to `bufferSize` elements of the produced streams may be
 * buffered in memory by this operator.
 */

export function chainPar_(self, n, f, bufferSize = 16) {
  return new C.Stream(CH.mergeMap_(CH.concatMap_(self.channel, _ => CH.writeChunk(_)), n, _ => f(_).channel, bufferSize));
}
/**
 * Maps each element of this stream to another stream and returns the
 * non-deterministic merge of those streams, executing up to `n` inner streams
 * concurrently. Up to `bufferSize` elements of the produced streams may be
 * buffered in memory by this operator.
 *
 * @ets_data_first chainPar_
 */

export function chainPar(n, f, bufferSize = 16) {
  return self => chainPar_(self, n, f, bufferSize);
}
//# sourceMappingURL=chainPar.mjs.map