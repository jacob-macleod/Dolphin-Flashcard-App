// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as AsyncMaybe from "./asyncMaybe.mjs";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The optionality of the error type `E` can be used to signal the end of the stream,
 * by setting it to `None`.
 */

export function async(register, outputBuffer = 16) {
  return AsyncMaybe.asyncMaybe(callback => {
    register(callback);
    return O.none;
  }, outputBuffer);
}
//# sourceMappingURL=async.mjs.map