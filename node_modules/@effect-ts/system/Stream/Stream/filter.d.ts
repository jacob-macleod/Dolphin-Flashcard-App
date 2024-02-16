import type { Predicate, Refinement } from "../../Function/index.js";
import type { Stream } from "./definitions.js";
/**
 * Applies the predicate to each element and allows passing elements
 * to reach the output of this stream.
 */
export declare function filter<O, O1 extends O>(f: Refinement<O, O1>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O1>;
export declare function filter<O>(f: Predicate<O>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O>;
/**
 * Applies the predicate to each element and allows passing elements
 * to reach the output of this stream.
 */
export declare function filter_<R, E, O, O1 extends O>(self: Stream<R, E, O>, f: Refinement<O, O1>): Stream<R, E, O1>;
export declare function filter_<R, E, O>(self: Stream<R, E, O>, f: Predicate<O>): Stream<R, E, O>;
//# sourceMappingURL=filter.d.ts.map