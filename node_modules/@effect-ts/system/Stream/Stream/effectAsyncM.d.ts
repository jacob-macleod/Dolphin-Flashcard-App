import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as Ex from "../../Exit/index.js";
import type * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import type * as F from "../_internal/fiber.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times
 * The registration of the callback itself returns an effect. The optionality of the
 * error type `E` can be used to signal the end of the stream, by setting it to `None`.
 */
export declare function effectAsyncM<R, E, A, R1 = R, E1 = E>(register: (cb: (next: T.Effect<R, O.Option<E>, A.Chunk<A>>, offerCb?: F.Callback<never, boolean>) => T.UIO<Ex.Exit<never, boolean>>) => T.Effect<R1, E1, unknown>, outputBuffer?: number): Stream<R & R1, E | E1, A>;
//# sourceMappingURL=effectAsyncM.d.ts.map