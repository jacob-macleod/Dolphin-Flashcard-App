import type { Stream } from "./definitions.js";
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
export declare function bimap_<R, E, E1, O, O1>(self: Stream<R, E, O>, f: (e: E) => E1, g: (o: O) => O1): Stream<R, E1, O1>;
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
export declare function bimap<E, E1, O, O1>(f: (e: E) => E1, g: (o: O) => O1): <R>(self: Stream<R, E, O>) => Stream<R, E1, O1>;
//# sourceMappingURL=bimap.d.ts.map