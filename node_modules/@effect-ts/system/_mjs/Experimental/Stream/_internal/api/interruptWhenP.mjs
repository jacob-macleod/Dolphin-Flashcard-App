import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 */

export function interruptWhenP_(self, p) {
  return new C.Stream(CH.interruptWhenP_(self.channel, p));
}
/**
 * Interrupts the evaluation of this stream when the provided promise resolves. This
 * combinator will also interrupt any in-progress element being pulled from upstream.
 *
 * If the promise completes with a failure, the stream will emit that failure.
 *
 * @ets_data_first interruptWhenP_
 */

export function interruptWhenP(p) {
  return self => interruptWhenP_(self, p);
}
//# sourceMappingURL=interruptWhenP.mjs.map