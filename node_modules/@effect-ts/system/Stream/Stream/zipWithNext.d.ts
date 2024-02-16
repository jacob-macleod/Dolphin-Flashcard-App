import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as O from "../../Option/index.js";
import { Stream } from "./definitions.js";
/**
 * Zips each element with the next element if present.
 */
export declare function zipWithNext<R, E, O>(self: Stream<R, E, O>): Stream<R, E, Tp.Tuple<[O, O.Option<O>]>>;
//# sourceMappingURL=zipWithNext.d.ts.map