import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Stream } from "./definitions.js";
/**
 * Zips this stream together with the index of elements.
 */
export declare function zipWithIndex<R, E, O>(self: Stream<R, E, O>): Stream<R, E, Tp.Tuple<[O, number]>>;
//# sourceMappingURL=zipWithIndex.d.ts.map