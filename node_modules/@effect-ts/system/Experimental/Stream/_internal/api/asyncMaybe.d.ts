import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
import type { Emit } from "./_internal/Emit.js";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The registration of the callback can possibly return the stream synchronously.
 * The optionality of the error type `E` can be used to signal the end of the stream,
 * by setting it to `None`.
 */
export declare function asyncMaybe<R, E, A>(register: (emit: Emit<R, E, A, void>) => O.Option<C.Stream<R, E, A>>, outputBuffer?: number): C.Stream<R, E, A>;
//# sourceMappingURL=asyncMaybe.d.ts.map