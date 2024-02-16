import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Zips each element with the next element if present.
 */
export declare function zipWithNext<R, E, A>(self: C.Stream<R, E, A>): C.Stream<R, E, Tp.Tuple<[A, O.Option<A>]>>;
//# sourceMappingURL=zipWithNext.d.ts.map