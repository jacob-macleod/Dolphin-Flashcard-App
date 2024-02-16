import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Zips each element with the previous element. Initially accompanied by `None`.
 */
export declare function zipWithPrevious<R, E, A>(self: C.Stream<R, E, A>): C.Stream<R, E, Tp.Tuple<[O.Option<A>, A]>>;
//# sourceMappingURL=zipWithPrevious.d.ts.map