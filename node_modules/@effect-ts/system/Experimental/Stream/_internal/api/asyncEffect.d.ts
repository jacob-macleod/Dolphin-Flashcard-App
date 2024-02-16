import * as T from "../../../../Effect/index.js";
import * as C from "../core.js";
import type { Emit } from "./_internal/Emit.js";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times
 * The registration of the callback itself returns an effect. The optionality of the
 * error type `E` can be used to signal the end of the stream, by setting it to `None`.
 */
export declare function asyncEffect<R, E, A, Z>(register: (emit: Emit<R, E, A, void>) => T.Effect<R, E, Z>, outputBuffer?: number): C.Stream<R, E, A>;
//# sourceMappingURL=asyncEffect.d.ts.map