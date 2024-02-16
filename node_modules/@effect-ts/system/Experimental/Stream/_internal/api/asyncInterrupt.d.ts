import * as E from "../../../../Either/index.js";
import * as C from "../core.js";
import type { Canceler, Emit } from "./_internal/Emit.js";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The registration of the callback returns either a canceler or synchronously returns a stream.
 * The optionality of the error type `E` can be used to signal the end of the stream, by
 * setting it to `None`.
 */
export declare function asyncInterrupt<R, E, A>(register: (emit: Emit<R, E, A, void>) => E.Either<Canceler<R>, C.Stream<R, E, A>>, outputBuffer?: number): C.Stream<R, E, A>;
//# sourceMappingURL=asyncInterrupt.d.ts.map