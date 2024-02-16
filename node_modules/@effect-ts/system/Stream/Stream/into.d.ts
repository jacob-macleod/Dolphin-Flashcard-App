import type * as Q from "../../Queue/index.js";
import type * as Take from "../../Stream/Take/index.js";
import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 */
export declare function into_<R, E, O>(self: Stream<R, E, O>, queue: Q.XQueue<R, never, never, unknown, Take.Take<E, O>, unknown>): T.Effect<R, E, void>;
/**
 * Enqueues elements of this stream into a queue. Stream failure and ending will also be
 * signalled.
 */
export declare function into<R, E, O>(queue: Q.XQueue<R, never, never, unknown, Take.Take<E, O>, unknown>): (self: Stream<R, E, O>) => T.Effect<R, E, void>;
//# sourceMappingURL=into.d.ts.map