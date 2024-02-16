import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Like `unfold`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */
export declare function paginate<A, S>(s: S, f: (s: S) => Tp.Tuple<[A, O.Option<S>]>): C.UIO<A>;
//# sourceMappingURL=paginate.d.ts.map