var _a; // ets_tracing: off


import * as C from "../../Cause/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import { catchSome } from "./catchSome.mjs";
import { timeoutErrorCause } from "./timeoutErrorCause.mjs";
export const StreamTimeoutSymbol = /*#__PURE__*/Symbol.for("@matechs/core/Stream/Stream/timeoutTo/StreamTimeout");
export class StreamTimeoutError extends Error {
  constructor(message) {
    super(message);
    this[_a] = "StreamTimeoutError";
    this.name = this[StreamTimeoutSymbol];
  }

}
_a = StreamTimeoutSymbol;
export const isStreamTimeout = u => u instanceof Error && u[StreamTimeoutSymbol] === "StreamTimeoutError";
/**
 * Switches the stream if it does not produce a value after d duration.
 */

export function timeoutTo(d) {
  return that => self => catchSome(e => {
    if (isStreamTimeout(e)) {
      return O.some(that);
    }

    return O.none;
  })(timeoutErrorCause(C.die(new StreamTimeoutError()))(d)(self));
}
//# sourceMappingURL=timeoutTo.mjs.map