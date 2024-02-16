import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as Ex from "../../Exit/index.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import type * as F from "../_internal/fiber.js";
import { Stream } from "./definitions.js";
/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The registration of the callback can possibly return the stream synchronously.
 * The optionality of the error type `E` can be used to signal the end of the stream,
 * by setting it to `None`.
 */
export declare function effectAsyncMaybe<R, E, A>(register: (cb: (next: T.Effect<R, O.Option<E>, A.Chunk<A>>, offerCb?: F.Callback<never, boolean>) => T.UIO<Ex.Exit<never, boolean>>) => O.Option<Stream<R, E, A>>, outputBuffer?: number): Stream<R, E, A>;
//# sourceMappingURL=effectAsyncMaybe.d.ts.map