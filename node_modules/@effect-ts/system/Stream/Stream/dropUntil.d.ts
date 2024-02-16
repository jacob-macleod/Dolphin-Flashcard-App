import type { Predicate } from "../../Function/index.js";
import type { Stream } from "./definitions.js";
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
export declare function dropUntil_<R, E, O>(self: Stream<R, E, O>, pred: Predicate<O>): Stream<R, E, O>;
/**
 * Drops all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
export declare function dropUntil<O>(pred: Predicate<O>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=dropUntil.d.ts.map