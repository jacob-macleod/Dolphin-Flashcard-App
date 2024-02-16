import * as E from "../../Either/index.mjs";
import { effectAsyncInterruptEither } from "./effectAsyncInterruptEither.mjs";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The registration of the callback returns either a canceler or synchronously returns a stream.
 * The optionality of the error type `E` can be used to signal the end of the stream, by
 * setting it to `None`.
 */

export function effectAsyncInterrupt(register, outputBuffer = 16) {
  return effectAsyncInterruptEither(cb => E.left(register(cb)), outputBuffer);
}
//# sourceMappingURL=effectAsyncInterrupt.mjs.map