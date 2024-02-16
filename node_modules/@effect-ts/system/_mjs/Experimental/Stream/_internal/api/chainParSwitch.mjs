// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Maps each element of this stream to another stream and returns the non-deterministic merge
 * of those streams, executing up to `n` inner streams concurrently. When a new stream is created
 * from an element of the source stream, the oldest executing stream is cancelled. Up to `bufferSize`
 * elements of the produced streams may be buffered in memory by this operator.
 */

export function chainParSwitch_(self, f, n, bufferSize = 16) {
  return new C.Stream(CH.mergeMap_(CH.concatMap_(self.channel, _ => CH.writeChunk(_)), n, _ => f(_).channel, bufferSize, "BufferSliding"));
}
/**
 * Maps each element of this stream to another stream and returns the non-deterministic merge
 * of those streams, executing up to `n` inner streams concurrently. When a new stream is created
 * from an element of the source stream, the oldest executing stream is cancelled. Up to `bufferSize`
 * elements of the produced streams may be buffered in memory by this operator.
 *
 * @ets_data_first chainParSwitch_
 */

export function chainParSwitch(f, n, bufferSize = 16) {
  return self => chainParSwitch_(self, f, n, bufferSize);
}
//# sourceMappingURL=chainParSwitch.mjs.map