import type { Stream } from "./definitions.js";
/**
 * Maps the success values of this stream to the specified constant value.
 */
export declare function as_<R, E, O, O2>(self: Stream<R, E, O>, o2: O2): Stream<R, E, O2>;
/**
 * Maps the success values of this stream to the specified constant value.
 */
export declare function as<O2>(o2: O2): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, O2>;
//# sourceMappingURL=as.d.ts.map