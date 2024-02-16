import * as O from "../../Option/index.mjs";
import { effectAsyncMaybe } from "./effectAsyncMaybe.mjs";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The optionality of the error type `E` can be used to signal the end of the stream,
 * by setting it to `None`.
 */

export function effectAsync(register, outputBuffer = 16) {
  return effectAsyncMaybe(cb => {
    register(cb);
    return O.none;
  }, outputBuffer);
}
//# sourceMappingURL=effectAsync.mjs.map