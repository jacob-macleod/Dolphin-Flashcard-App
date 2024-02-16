import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type * as T from "../_internal/effect.js";
import type * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
export declare function forEach_<R, R1, E, E1, A, X>(self: Stream<R, E, A>, f: (i: A) => T.Effect<R1, E1, X>): T.Effect<R & R1, E1 | E, void>;
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
export declare function forEach<R1, E1, A, X>(f: (i: A) => T.Effect<R1, E1, X>): <R, E>(self: Stream<R, E, A>) => T.Effect<R & R1, E1 | E, void>;
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function forEachWhileManaged_<R, R1, E, E1, O>(self: Stream<R, E, O>, f: (o: O) => T.Effect<R1, E1, boolean>): M.Managed<R & R1, E | E1, void>;
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function forEachWhileManaged<R1, E1, O>(f: (o: O) => T.Effect<R1, E1, boolean>): <R, E>(self: Stream<R, E, O>) => M.Managed<R & R1, E1 | E, void>;
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
export declare function forEachChunk_<R, R1, E, E1, O, X>(self: Stream<R, E, O>, f: (o: A.Chunk<O>) => T.Effect<R1, E1, X>): T.Effect<R & R1, E | E1, void>;
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
export declare function forEachChunk<R1, E1, O, X>(f: (o: A.Chunk<O>) => T.Effect<R1, E1, X>): <R, E>(self: Stream<R, E, O>) => T.Effect<R & R1, E1 | E, void>;
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 */
export declare function forEachWhile_<R, R1, E, E1, O>(self: Stream<R, E, O>, f: (o: O) => T.Effect<R1, E1, boolean>): T.Effect<R & R1, E | E1, void>;
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 */
export declare function forEachWhile<R1, E1, O>(f: (o: O) => T.Effect<R1, E1, boolean>): <R, E>(self: Stream<R, E, O>) => T.Effect<R & R1, E1 | E, void>;
/**
 * Like `forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function forEachManaged_<A, R, R1, E, E1, X>(self: Stream<R, E, A>, f: (i: A) => T.Effect<R1, E1, X>): M.Managed<R & R1, E1 | E, void>;
/**
 * Like `forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function forEachManaged<A, R1, E1, X>(f: (i: A) => T.Effect<R1, E1, X>): <R, E>(self: Stream<R, E, A>) => M.Managed<R & R1, E1 | E, void>;
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function forEachChunkManaged_<R, R1, E, E1, O, X>(self: Stream<R, E, O>, f: (f: A.Chunk<O>) => T.Effect<R1, E1, X>): M.Managed<R & R1, E | E1, void>;
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */
export declare function forEachChunkManaged<R, R1, E, E1, O, X>(f: (f: A.Chunk<O>) => T.Effect<R1, E1, X>): (self: Stream<R, E, O>) => M.Managed<R & R1, E | E1, void>;
//# sourceMappingURL=forEach.d.ts.map