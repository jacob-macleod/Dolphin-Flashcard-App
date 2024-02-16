import type * as L from "../../Collections/Immutable/List/index.js";
import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Runs the stream and collects all of its elements to an array.
 */
export declare const runCollect: <R, E, O>(self: Stream<R, E, O>) => T.Effect<R, E, readonly O[]>;
/**
 * Runs the stream and collects all of its elements to an array.
 */
export declare const runList: <R, E, O>(self: Stream<R, E, O>) => T.Effect<R, E, L.List<O>>;
//# sourceMappingURL=runCollect.d.ts.map