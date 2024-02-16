// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as AsyncInterrupt from "./asyncInterrupt.mjs";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The registration of the callback can possibly return the stream synchronously.
 * The optionality of the error type `E` can be used to signal the end of the stream,
 * by setting it to `None`.
 */

export function asyncMaybe(register, outputBuffer = 16) {
  return AsyncInterrupt.asyncInterrupt(k => E.fromOption_(register(k), () => T.unit), outputBuffer);
}
//# sourceMappingURL=asyncMaybe.mjs.map