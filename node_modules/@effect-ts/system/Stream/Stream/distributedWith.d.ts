import * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as Ex from "../../Exit/index.js";
import * as O from "../../Option/index.js";
import type * as Q from "../../Queue/index.js";
import * as T from "../_internal/effect.js";
import * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * More powerful version of `broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */
export declare function distributedWith<O>(n: number, maximumLag: number, decide: (_: O) => T.UIO<(_: number) => boolean>): <R, E>(self: Stream<R, E, O>) => M.Managed<R, never, A.Chunk<Q.Dequeue<Ex.Exit<O.Option<E>, O>>>>;
/**
 * More powerful version of `broadcast`. Allows to provide a function that determines what
 * queues should receive which elements. The decide function will receive the indices of the queues
 * in the resulting list.
 */
export declare function distributedWith_<R, E, O>(self: Stream<R, E, O>, n: number, maximumLag: number, decide: (_: O) => T.UIO<(_: number) => boolean>): M.Managed<R, never, A.Chunk<Q.Dequeue<Ex.Exit<O.Option<E>, O>>>>;
//# sourceMappingURL=distributedWith.d.ts.map