import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as T from "../../../../Effect/index.js";
import * as O from "../../../../Option/index.js";
import * as C from "../core.js";
/**
 * Like `unfoldChunkEff`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */
export declare function paginateChunkEffect<R, E, A, S>(s: S, f: (s: S) => T.Effect<R, E, Tp.Tuple<[CK.Chunk<A>, O.Option<S>]>>): C.Stream<R, E, A>;
//# sourceMappingURL=paginateChunkEffect.d.ts.map