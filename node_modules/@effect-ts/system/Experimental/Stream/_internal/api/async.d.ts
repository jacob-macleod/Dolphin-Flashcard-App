import type * as C from "../core.js";
import type { Emit } from "./_internal/Emit.js";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The optionality of the error type `E` can be used to signal the end of the stream,
 * by setting it to `None`.
 */
export declare function async<R, E, A>(register: (emit: Emit<R, E, A, void>) => void, outputBuffer?: number): C.Stream<R, E, A>;
//# sourceMappingURL=async.d.ts.map