import type { Predicate } from "../../Function/index.js";
import { Stream } from "./definitions.js";
/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
export declare function takeUntil_<R, E, O>(self: Stream<R, E, O>, pred: Predicate<O>): Stream<R, E, O>;
/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
export declare function takeUntil<O>(pred: Predicate<O>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=takeUntil.d.ts.map