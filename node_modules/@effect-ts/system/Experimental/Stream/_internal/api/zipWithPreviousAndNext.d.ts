import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Zips each element with both the previous and next element.
 */
export declare function zipWithPreviousAndNext<R, E, A>(self: C.Stream<R, E, A>): C.Stream<R, E, Tp.Tuple<[O.Option<A>, A, O.Option<A>]>>;
//# sourceMappingURL=zipWithPreviousAndNext.d.ts.map