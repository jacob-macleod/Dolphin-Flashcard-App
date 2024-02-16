import type { Predicate } from "../../Function/index.js";
import { Stream } from "./definitions.js";
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */
export declare function takeWhile_<R, E, O>(self: Stream<R, E, O>, pred: Predicate<O>): Stream<R, E, O>;
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */
export declare function takeWhile<O>(pred: Predicate<O>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=takeWhile.d.ts.map