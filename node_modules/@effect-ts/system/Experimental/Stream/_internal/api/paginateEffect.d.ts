import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../../Effect/index.js";
import type * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Like `unfoldEff`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */
export declare function paginateEffect<R, E, A, S>(s: S, f: (s: S) => T.Effect<R, E, Tp.Tuple<[A, O.Option<S>]>>): C.Stream<R, E, A>;
//# sourceMappingURL=paginateEffect.d.ts.map