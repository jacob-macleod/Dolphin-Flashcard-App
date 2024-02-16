import type { Predicate } from "../../Function/index.js";
import type { Stream } from "./definitions.js";
/**
 * Filters this stream by the specified predicate, removing all elements for
 * which the predicate evaluates to true.
 */
export declare function filterNot_<R, E, O>(self: Stream<R, E, O>, pred: Predicate<O>): Stream<R, E, O>;
/**
 * Filters this stream by the specified predicate, removing all elements for
 * which the predicate evaluates to true.
 */
export declare function filterNot<O>(pred: Predicate<O>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=filterNot.d.ts.map