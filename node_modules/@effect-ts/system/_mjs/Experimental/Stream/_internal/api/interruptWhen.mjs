import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Interrupts the evaluation of this stream when the provided IO completes. The given
 * IO will be forked as part of this stream, and its success will be discarded. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the IO completes with a failure before the stream completes, the returned stream
 * will emit that failure.
 */

export function interruptWhen_(self, io) {
  return new C.Stream(CH.interruptWhen_(self.channel, io));
}
/**
 * Interrupts the evaluation of this stream when the provided IO completes. The given
 * IO will be forked as part of this stream, and its success will be discarded. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the IO completes with a failure before the stream completes, the returned stream
 * will emit that failure.
 *
 * @ets_data_first interruptWhen_
 */

export function interruptWhen(io) {
  return self => interruptWhen_(self, io);
}
//# sourceMappingURL=interruptWhen.mjs.map