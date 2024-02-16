var _a; // ets_tracing: off


import * as CS from "../../../../Cause/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CatchSomeCause from "./catchSomeCause.mjs";
import * as TimeoutFailCause from "./timeoutFailCause.mjs";
export const StreamTimeoutSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/StreamTimeout");
export class StreamTimeoutError {
  constructor(message) {
    this.message = message;
    this[_a] = "StreamTimeoutError";
  }

}
_a = StreamTimeoutSymbol;
export const isStreamTimeoutError = u => u instanceof StreamTimeoutError && u[StreamTimeoutSymbol] === "StreamTimeoutError";
/**
 * Switches the stream if it does not produce a value after d duration.
 */

export function timeoutTo_(self, d, that) {
  return CatchSomeCause.catchSomeCause_(TimeoutFailCause.timeoutFailCause_(self, CS.die(new StreamTimeoutError()), d), e => {
    if (e._tag === "Die") {
      return O.some(that);
    }

    return O.none;
  });
}
/**
 * Switches the stream if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutTo_
 */

export function timeoutTo(d, that) {
  return self => timeoutTo_(self, d, that);
}
//# sourceMappingURL=timeoutTo.mjs.map