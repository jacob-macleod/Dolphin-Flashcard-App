import * as C from "../core.js";
/**
 * Transforms the elements of this stream using the supplied function.
 */
export declare function map_<R, E, O, O1>(self: C.Stream<R, E, O>, f: (o: O) => O1): C.Stream<R, E, O1>;
/**
 * Transforms the elements of this stream using the supplied function.
 *
 * @ets_data_first map_
 */
export declare function map<O, O1>(f: (o: O) => O1): <R, E>(self: C.Stream<R, E, O>) => C.Stream<R, E, O1>;
//# sourceMappingURL=map.d.ts.map