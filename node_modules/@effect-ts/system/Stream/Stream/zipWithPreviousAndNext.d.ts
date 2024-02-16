import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Zips each element with both the previous and next element.
 */
export declare function zipWithPreviousAndNext<R, E, O>(self: Stream<R, E, O>): Stream<R, E, Tp.Tuple<[O.Option<O>, O, O.Option<O>]>>;
//# sourceMappingURL=zipWithPreviousAndNext.d.ts.map